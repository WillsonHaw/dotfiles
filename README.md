# dotfiles

NixOS flake for my machines, plus home-manager config. Single flake at `nixos/` defines several host configurations sharing common modules.

## Hosts

| Host                   | Use                                         | DE       | Notes                                         |
| ---------------------- | ------------------------------------------- | -------- | --------------------------------------------- |
| `slumpy-laptop`        | Daily-driver laptop (MSI GS60)              | Niri     | TLP, mcontrolcenter, hibernate-on-sleep       |
| `slumpy-laptop-komodo` | KOMODO laptop (Intel Arc)                   | Niri     | hibernate-on-sleep, NFS mount to vm-komodo    |
| `slumpy-desktop`       | Workstation                                 | Hyprland | Godot, OBS, Razer                             |
| `slumpy-gaming`        | Gaming box                                  | Hyprland | Steam, OBS                                    |
| `slumpy-vm-home`       | Home VM, personal projects and scripts      | none     | Shares the `vm` role + nginx                  |
| `slumpy-vm-komodo`     | KOMODO VM                                   | none     | Shares the `vm` role + nginx, NFS/Samba share |
| `slumpy-vm-noodlefish` | Noodlefish VM                               | none     | Shares the `vm` role                          |

Desktop and laptop hosts inherit from [`hosts/desktop-base.nix`](nixos/hosts/desktop-base.nix) (GUI app bundle, Avahi mDNS resolver). The `vm-*` hosts inherit from [`hosts/vm-base.nix`](nixos/hosts/vm-base.nix) (docker, gh, direnv, ripgrep/fd/fzf/bat/eza, headless, Avahi host announcement). Each machine's own `default.nix` picks the hostname, hardware config, and any opt-in services.

Pick the one that matches the machine you're installing.

## Quickstart — fresh install

Boot the [NixOS minimal installer ISO](https://nixos.org/download.html) (wired networking comes up automatically; wifi → `nmtui`). Then:

```bash
sudo -i
nix-shell -p git --run \
  'git clone https://<USER>:<PASS>@github.com/<USER>/dotfiles.git /tmp/dotfiles'

/tmp/dotfiles/nixos/install.sh
# ↑ prompts for which host to install; auto-picks the disk if there's only one

# Remove install media and ensure correct boot device. Then:
reboot
```

That's it. [`nixos/install.sh`](nixos/install.sh) handles partitioning (UEFI/GPT), formatting, mounting, hardware-config generation, and `nixos-install`. After it finishes:

```bash
# Password is locked until SOPS is set up — SSH in with an existing authorized key
ssh slumpy@<machine-ip>

# 1. Generate SSH + GPG keys for this machine, add them to GitHub
git init-keys

# 2. Move the repo to preferred location and fix ownership
sudo mv /etc/nixos/dotfiles ~/dotfiles
sudo chown -R slumpy:users ~/dotfiles

# 3. Fix git remote to use ssh
git remote remove origin
git remote add origin git@github.com:WillsonHaw/dotfiles.git
git branch --set-upstream-to=origin/main main

# 4. Push up new host and hardware config
git commit -am 'Add new host <hostname>'
git push

# 5. Set up SOPS to unlock the password (see "Update sops keys" below)
#    sudo works passwordlessly (wheel group) so you can rebuild once SOPS is ready

```

> **No password on first boot.** The user account is created with a locked password (`!`). Login via SSH using any of the authorized keys already declared in [`nixos/users/slumpy.nix`](nixos/users/slumpy.nix). `sudo` works without a password (wheel is passwordless) so you can rebuild once SOPS is set up. The password from the encrypted secret is applied automatically after the rebuild.

> **BIOS, LUKS, btrfs, or multi-disk setups?** The script assumes a single-disk UEFI install with no encryption. For anything else, partition/mount manually and run the latter half of the script by hand (or see the [NixOS manual](https://nixos.org/manual/nixos/stable/#sec-installation)). The `vm-*` hosts enable `zramSwap` so an on-disk swap partition is only needed for hibernation.

## After install

```bash
# Generate ed25519 SSH + GPG keys and register them with GitHub
git init-keys
# (paste the printed SSH + GPG public keys into github.com/settings/keys)
```

Signed commits and tags are on by default ([`commit.gpgsign`](nixos/modules/services/git/default.nix), `tag.gpgsign`). The dynamic `user.signingkey` is written by `git-init-keys` to `~/.config/git/config.local`.

Then follow the SOPS key setup below to unlock the password for local login.

## Day-to-day

```bash
# Rebuild the current host (wrapper defined in nixos/modules/shell/zsh/)
rebuild

# Rebuild a specific host
sudo nixos-rebuild switch --flake ~/dotfiles/nixos#slumpy-desktop

# Update inputs + rebuild
rebuild-all

# Dry-build to validate without applying
nix build .#nixosConfigurations.slumpy-vm-komodo.config.system.build.toplevel --dry-run
```

## Adding a new host

For a standalone host:

1. `mkdir nixos/hosts/<name>` with a `default.nix` importing `../common.nix` and `./hardware-configuration.nix`.
2. Desktop machines also import `../desktop-base.nix` for the GUI app bundle.
3. Register it in [`nixos/flake.nix`](nixos/flake.nix): `slumpy-<name> = mkHost "<name>" { };`.
4. Set `networking.hostName`, `system.stateVersion`, boot loader, and any `noodles.*` feature flags.

For another VM/headless machine:

1. `mkdir nixos/hosts/vm-<name>` with a `default.nix` importing `../vm-base.nix` and `./hardware-configuration.nix`.
2. Register `slumpy-vm-<name> = mkHost "vm-<name>" { };` in the flake.
3. Toggle the optional `noodles.*` services this machine needs (e.g. `noodles.services.nginx.enable = true;`).

### Update sops keys

This is required after a fresh install to unlock the user password for local login. Run on the new machine after `git init-keys`:

1. Derive an age key from the new SSH key:
   ```bash
   mkdir -p ~/.config/sops/age
   nix-shell -p ssh-to-age --run 'ssh-to-age -private-key -i ~/.ssh/id_ed25519 > ~/.config/sops/age/keys.txt'
   ```
2. Get the age public key to add to `.sops.yaml`:
   ```bash
   nix-shell -p age --run 'age-keygen -y ~/.config/sops/age/keys.txt'
   ```
3. On an existing machine that can decrypt secrets, add the new public key to `nixos/.sops.yaml` and re-encrypt:
   ```bash
   cd nixos
   nix-shell -p sops --run 'sops updatekeys secrets/secrets.yaml'
   git commit -am "sops: add <hostname> age key" && git push
   ```
4. Back on the new machine, pull and rebuild:
   ```bash
   git pull && rebuild
   ```

After the rebuild, `sops-apply-user-password.service` applies the decrypted password hash and local login works.

## Adding an optional service

Optional services follow the existing `noodles.*` pattern — see [`modules/services/nginx/default.nix`](nixos/modules/services/nginx/default.nix) for the canonical example:

```nix
{ config, lib, ... }:
{
  options.noodles.services.<name>.enable = lib.mkEnableOption "Enable <name>.";

  config = lib.mkIf config.noodles.services.<name>.enable {
    # ...real config...
  };
}
```

Drop the module under `modules/services/<name>/default.nix`. The auto-importer at [`modules/services/default.nix`](nixos/modules/services/default.nix) picks it up — no manual import. Any host opts in with one line:

```nix
noodles.services.<name>.enable = true;
```

See [`CLAUDE.md`](CLAUDE.md) for the broader module conventions (`noodles.*` namespace, auto-import aggregators, home-manager integration).
