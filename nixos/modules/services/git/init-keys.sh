# Generate SSH + GPG keys for the configured git identity if they don't already
# exist, then print the public values to register with GitHub.
#
# Identity is read from `git config` (set by the git nix module).
# Idempotent — safe to re-run; existing keys are left alone.

git_name="$(git config --global --get user.name || true)"
git_email="$(git config --global --get user.email || true)"

if [[ -z "$git_name" || -z "$git_email" ]]; then
  echo "git user.name / user.email are not set. Configure them first." >&2
  exit 1
fi

ssh_key="$HOME/.ssh/id_ed25519"
mkdir -p "$HOME/.ssh"
chmod 700 "$HOME/.ssh"

if [[ -f "$ssh_key" ]]; then
  echo "SSH key already exists at $ssh_key — skipping generation."
else
  echo "Generating ed25519 SSH key at $ssh_key ..."
  ssh-keygen -t ed25519 -C "$git_email ($(hostname))" -f "$ssh_key" -N ""
fi

# Load the key into the running ssh-agent (idempotent — already-loaded keys
# are silently ignored). Skips if no agent is reachable (e.g. script invoked
# from a context without $SSH_AUTH_SOCK set yet).
if [[ -n "${SSH_AUTH_SOCK:-}" ]]; then
  ssh-add "$ssh_key" 2>/dev/null || echo "ssh-add failed — check that ssh-agent is running."
else
  echo "ssh-agent not reachable (SSH_AUTH_SOCK unset). Log out and back in, then run 'ssh-add $ssh_key'."
fi

if gpg --list-secret-keys --with-colons "$git_email" 2>/dev/null | grep -q '^sec:'; then
  echo "GPG key for $git_email already exists — skipping generation."
else
  echo "Generating ed25519 GPG key for $git_email ..."
  gpg --batch --pinentry-mode loopback --passphrase "" --quick-generate-key \
    "$git_name <$git_email>" ed25519 default 0
fi

gpg_fpr="$(gpg --list-secret-keys --with-colons "$git_email" \
  | awk -F: '/^fpr:/ { print $10; exit }')"

# commit.gpgsign / tag.gpgsign are declared in the nix git module. signingkey
# is per-host, so we write it to the local include file the module pulls in.
local_cfg="$HOME/.config/git/config.local"
mkdir -p "$(dirname "$local_cfg")"
git config --file "$local_cfg" user.signingkey "$gpg_fpr"

echo
echo "=========================================="
echo "Add these to GitHub:"
echo "=========================================="
echo
echo "--- SSH public key (Settings → SSH and GPG keys → New SSH key) ---"
cat "${ssh_key}.pub"
echo
echo "--- GPG public key (Settings → SSH and GPG keys → New GPG key) ---"
gpg --armor --export "$gpg_fpr"
echo
echo "--- GPG key id ---"
echo "$gpg_fpr"
echo
echo "user.signingkey written to $local_cfg."
