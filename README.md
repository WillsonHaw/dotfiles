# dotfiles

NixOS flake for my machines, plus home-manager config. Single flake at `nixos/` defines several host configurations sharing common modules.

## Hosts

| Host                | Use                                         | DE       | Notes                                   |
| ------------------- | ------------------------------------------- | -------- | --------------------------------------- |
| `slumpy-laptop`     | Daily-driver laptop (MSI GS60)              | Niri     | TLP, mcontrolcenter, hibernate-on-sleep |
| `slumpy-desktop`    | Workstation                                 | Hyprland | Godot, OBS, Razer                       |
| `slumpy-gaming`     | Gaming box                                  | Hyprland | Steam, OBS                              |
| `slumpy-dev-home`   | Home dev box, personal projects and scripts | none     | Shares the `dev` role + nginx           |
| `slumpy-dev-komodo` | KOMODO dev box                              | none     | Shares the `dev` role + nginx           |

The `dev-*` hosts both inherit from [`hosts/dev-base.nix`](nixos/hosts/dev-base.nix) (docker, gh, direnv, ripgrep/fd/fzf/bat/eza, headless). Each machine's own `default.nix` picks the hostname, hardware config, and any opt-in services like nginx.

Pick the one that matches the machine you're installing.

## Quickstart — fresh install

From the NixOS installer ISO, after partitioning and mounting to `/mnt`:

```bash
# 1. Network
sudo systemctl start NetworkManager && nmtui   # or wired

# 2. Hardware config for this machine
nixos-generate-config --root /mnt

# 3. Clone this repo (private — use a fine-grained read-only PAT)
nix-shell -p git --run \
  'git clone https://<USER>:<PAT>@github.com/<USER>/dotfiles.git /mnt/etc/nixos/dotfiles'

# 4. Copy the generated hardware config into the chosen host
HOST=slumpy-dev-home   # or slumpy-laptop / slumpy-desktop / slumpy-gaming / slumpy-dev-komodo
TARGET=${HOST#slumpy-}
cp /mnt/etc/nixos/hardware-configuration.nix \
   /mnt/etc/nixos/dotfiles/nixos/hosts/$TARGET/hardware-configuration.nix

# 5. Install
nixos-install --root /mnt \
  --flake /mnt/etc/nixos/dotfiles/nixos#$HOST \
  --no-root-passwd

# 6. Reboot, log in, then move the repo into place
sudo mv /etc/nixos/dotfiles ~/dotfiles
```

`--no-root-passwd` is required: `users.mutableUsers = false` and the user's `hashedPassword` is set declaratively. Make sure that hash matches a password you remember — once installed there's no `passwd` recovery path (your declared SSH key in [`nixos/users/slumpy.nix`](nixos/users/slumpy.nix) is the backup).

## After install

```bash
# Generate ed25519 SSH + GPG keys and register them with GitHub
git init-keys
# (paste the printed SSH + GPG public keys into github.com/settings/keys)
```

Signed commits and tags are on by default ([`commit.gpgsign`](nixos/modules/services/git/default.nix), `tag.gpgsign`). The dynamic `user.signingkey` is written by `git-init-keys` to `~/.config/git/config.local`.

## Day-to-day

```bash
# Rebuild the current host (wrapper defined in nixos/modules/shell/zsh/)
rebuild

# Rebuild a specific host
sudo nixos-rebuild switch --flake ~/dotfiles/nixos#slumpy-desktop

# Update inputs + rebuild
rebuild-all

# Dry-build to validate without applying
nix build .#nixosConfigurations.slumpy-dev-home.config.system.build.toplevel --dry-run
```

## Adding a new host

For a standalone host:

1. `mkdir nixos/hosts/<name>` with a `default.nix` importing `../common.nix` and `./hardware-configuration.nix`.
2. Desktop machines also import `../desktop-defaults.nix` for the GUI app bundle.
3. Register it in [`nixos/flake.nix`](nixos/flake.nix): `slumpy-<name> = mkHost "<name>" { };`.
4. Set `networking.hostName`, `system.stateVersion`, boot loader, and any `noodles.*` feature flags.

For another machine that should share an existing **role** (e.g. another dev box):

1. `mkdir nixos/hosts/dev-<name>` with a `default.nix` importing `../dev-base.nix` and `./hardware-configuration.nix`.
2. Register `slumpy-dev-<name> = mkHost "dev-<name>" { };` in the flake.
3. Toggle the optional `noodles.*` services this machine needs (e.g. `noodles.services.nginx.enable = true;`).

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
