# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build Commands

The flake lives in `nixos/`, not the repo root. Rebuild the current host:

```bash
sudo nixos-rebuild switch --flake ~/dotfiles/nixos
```

A `rebuild` shell function (defined in `nixos/modules/shell/zsh/default.nix`) wraps this. To target a specific host:

```bash
sudo nixos-rebuild switch --flake ~/dotfiles/nixos#slumpy-laptop
sudo nixos-rebuild switch --flake ~/dotfiles/nixos#slumpy-desktop
sudo nixos-rebuild switch --flake ~/dotfiles/nixos#slumpy-gaming
```

Dry-build to check for errors without applying:

```bash
nix build .#nixosConfigurations.slumpy-laptop.config.system.build.toplevel --dry-run
```

## Architecture

### Flake & Hosts

`nixos/flake.nix` defines three NixOS configurations (laptop, desktop, gaming). All share `hosts/common.nix` which imports `modules/` and `users/slumpy.nix`. Each host sets its own `system.stateVersion`, GPU bus IDs (in a `graphics.nix`), and `noodles.*` feature flags.

Key flake inputs: nixpkgs (unstable), home-manager, hyprland + plugins, catppuccin, zen-browser, nix-flatpak, nixos-hardware, ags. All inputs are passed via `specialArgs = { inherit inputs; }` (wrapped, not spread).

### Custom Option Namespace: `noodles.*`

All configuration is gated behind `noodles.*` options:

- `noodles.user` — username string, used everywhere as `config.noodles.user`
- `noodles.device.is-laptop` / `noodles.device.gpu.card` — device-level flags
- `noodles.desktops.environment` — enum: `hyprland|gnome|kde|sway|niri|cosmic|null`
- `noodles.desktops.components.<name>.enable` — shared UI components (rofi, waybar, etc.)
- `noodles.apps.<name>.enable`, `noodles.services.<name>.enable`, etc.

### Module Pattern

Every module follows the same structure:

```nix
{ config, lib, pkgs, ... }:
{
  options.noodles.<path>.enable = lib.mkEnableOption "description";
  config = lib.mkIf config.noodles.<path>.enable {
    # System-level config and/or:
    home-manager.users.${config.noodles.user} = { ... };
  };
}
```

Desktop environment modules use `lib.mkIf (config.noodles.desktops.environment == "<name>")` instead of a separate enable option.

### Auto-Import Aggregators

Directory-level `default.nix` files auto-import all subdirectories:

```nix
let
  dirs = lib.attrNames (
    lib.filterAttrs (_: type: type == "directory") (builtins.readDir ./.)
  );
in
{ imports = map (d: ./${d}) dirs; }
```

Adding a new module only requires creating a new subdirectory with a `default.nix` — no manual import list to update.

### Home-Manager Integration

Home-manager is integrated at the NixOS module level in `users/slumpy.nix` with `useGlobalPkgs = true` and `useUserPackages = true`. Modules reference `home-manager.users.${config.noodles.user}` — never a hardcoded username.

## Conventions

- Option paths mirror the filesystem: `noodles.apps.browsers.vivaldi.enable` → `modules/apps/browsers/vivaldi/`
- Always use `lib.mkEnableOption` + `lib.mkIf` for feature gating
- Never hardcode the username; use `config.noodles.user`
- `extraSpecialArgs = { inherit inputs; }` — wrapped, not spread
- `system.stateVersion` is set per-host, never in common.nix
- Catppuccin theming via `inputs.catppuccin.{nixosModules,homeModules}.catppuccin`
