#!/usr/bin/env bash
# Fresh NixOS install driver.
#
# Run from the NixOS minimal installer ISO, as root, after cloning this repo
# to /tmp/dotfiles. The script picks the target disk (auto-detects if only one
# is present), partitions UEFI/GPT, mounts /mnt, generates hardware config,
# and runs nixos-install for the host you choose.

set -euo pipefail

if [[ $EUID -ne 0 ]]; then
  echo "Run as root (sudo -i)." >&2
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# --- Network sanity check ---------------------------------------------------
if ! curl -sSf -m 5 https://cache.nixos.org >/dev/null; then
  echo "No internet reachable. Bring up networking (try 'nmtui') and re-run." >&2
  exit 1
fi

# --- Select base host -------------------------------------------------------
mapfile -t hosts < <(
  find "$SCRIPT_DIR/hosts" -mindepth 1 -maxdepth 1 -type d -printf '%f\n' | sort
)
if [[ ${#hosts[@]} -eq 0 ]]; then
  echo "No hosts found under $SCRIPT_DIR/hosts." >&2
  exit 1
fi

echo "Select a host to base the new host on:"
PS3="Base host: "
select base in "${hosts[@]}"; do
  [[ -n "${base:-}" ]] && break
done

# --- New host name ----------------------------------------------------------
while true; do
  read -rp "Enter a name for this host (letters, digits, hyphens): " new_name
  new_name="${new_name// /-}"
  if [[ -z "$new_name" ]]; then
    echo "Name cannot be empty." >&2
  elif [[ "$new_name" =~ [^a-zA-Z0-9-] ]]; then
    echo "Name must contain only letters, digits, and hyphens." >&2
  elif [[ -d "$SCRIPT_DIR/hosts/$new_name" ]]; then
    echo "Host '$new_name' already exists. Choose a different name." >&2
  else
    break
  fi
done

# --- Create new host from base ----------------------------------------------
cp -r "$SCRIPT_DIR/hosts/$base" "$SCRIPT_DIR/hosts/$new_name"

# Update networking.hostName in the copied default.nix
sed -i "s|networking\.hostName = \"[^\"]*\";|networking.hostName = \"slumpy-${new_name}\";|" \
  "$SCRIPT_DIR/hosts/$new_name/default.nix"

# Register the new host in flake.nix
awk -v entry="        slumpy-${new_name} = mkHost \"${new_name}\" { };" '
  /nixosConfigurations = \{/ { in_block=1 }
  in_block && /^      \};/ { print entry; in_block=0 }
  { print }
' "$SCRIPT_DIR/flake.nix" > "$SCRIPT_DIR/flake.nix.tmp" \
  && mv "$SCRIPT_DIR/flake.nix.tmp" "$SCRIPT_DIR/flake.nix"

# Stage the new host and updated flake so Nix sees them as tracked files
git -C "$REPO_DIR" add \
  "nixos/hosts/$new_name" \
  "nixos/flake.nix"

target="$new_name"
HOST="slumpy-${new_name}"

# --- Pick disk --------------------------------------------------------------
mapfile -t disks < <(
  lsblk -ndo NAME,TYPE,RM | awk '$2=="disk" && $3=="0" {print "/dev/"$1}'
)
if [[ ${#disks[@]} -eq 0 ]]; then
  echo "No non-removable disks found." >&2
  exit 1
elif [[ ${#disks[@]} -eq 1 ]]; then
  DISK="${disks[0]}"
else
  echo "Multiple disks found:"
  PS3="Select disk to WIPE: "
  select DISK in "${disks[@]}"; do
    [[ -n "${DISK:-}" ]] && break
  done
fi

# NVMe / mmc / loop devices need a "p" between disk and partition number.
PART=""
if [[ "$DISK" =~ (nvme|mmcblk|loop) ]]; then
  PART="p"
fi

# --- Confirm ----------------------------------------------------------------
cat <<EOF

About to:
  - WIPE   $DISK (all data lost)
  - INSTALL host '$HOST' from $REPO_DIR

EOF
read -rp "Proceed? [y/N] " ok
[[ "$ok" =~ ^[Yy]$ ]] || { echo "Aborted."; exit 1; }

# --- Partition --------------------------------------------------------------
echo "Partitioning $DISK ..."
parted -s "$DISK" mklabel gpt
parted -s "$DISK" mkpart ESP     fat32 1MiB 1GiB
parted -s "$DISK" set 1 esp on
parted -s "$DISK" mkpart primary ext4  1GiB 100%

partprobe "$DISK"
udevadm settle

mkfs.fat  -F32 -n ESP   "${DISK}${PART}1"
mkfs.ext4 -F   -L nixos "${DISK}${PART}2"

# Wait for udev to create the /dev/disk/by-label/* symlinks before mounting.
udevadm settle

# --- Mount ------------------------------------------------------------------
# Mount by device path rather than label — labels rely on udev symlinks that
# can race the mount call. nixos-generate-config still picks up UUIDs from
# /proc/mounts when it writes hardware-configuration.nix.
mount "${DISK}${PART}2" /mnt
mkdir -p /mnt/boot
mount -o umask=077 "${DISK}${PART}1" /mnt/boot

# --- Hardware config --------------------------------------------------------
nixos-generate-config --root /mnt

# --- Stage the repo on the new system ---------------------------------------
mkdir -p /mnt/etc/nixos
cp -a "$REPO_DIR" /mnt/etc/nixos/dotfiles

cp /mnt/etc/nixos/hardware-configuration.nix \
   "/mnt/etc/nixos/dotfiles/nixos/hosts/${target}/hardware-configuration.nix"

# --- Install ----------------------------------------------------------------
nixos-install --root /mnt \
  --flake "/mnt/etc/nixos/dotfiles/nixos#${HOST}" \
  --no-root-passwd

cat <<EOF

Install complete.

  1. reboot
  2. SSH in with an existing authorized key (password is locked until SOPS is set up):
       ssh slumpy@<machine-ip>
  3. sudo mv /etc/nixos/dotfiles ~/dotfiles
  4. sudo chown -R slumpy:users ~/dotfiles
  5. git init-keys     # generate SSH + GPG for this machine, paste to github.com/settings/keys

Then set up SOPS to unlock local login — see "Update sops keys" in README.md:
  a. Derive age key from the new SSH key and get its public key.
  b. On an existing machine: add the public key to .sops.yaml, run 'sops updatekeys', push.
  c. On this machine: git pull && rebuild

EOF
