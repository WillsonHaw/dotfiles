# Shared "dev" role — headless remote dev box accessed via VSCode SSH.
# Per-machine entries under hosts/dev-*/ import this and add their own
# hardware-configuration, hostname, stateVersion, boot loader, and any
# machine-specific service flags (nginx, postgres, etc.).
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    ./common.nix
    inputs.vscode-server.nixosModules.default
  ];

  zramSwap.enable = true;

  # Headless by default — VSCode Remote SSH connects to sshd. The vscode-server
  # module patches the binaries VSCode pushes to ~/.vscode-server so they
  # actually run on NixOS. Hosts that combine this role with a desktop env
  # (e.g. a dev laptop) can override `noodles.desktops.environment`.
  noodles.desktops.environment = lib.mkDefault null;
  services.vscode-server.enable = true;

  # Docker for containerized dev workflows.
  virtualisation.docker.enable = true;
  users.users.${config.noodles.user}.extraGroups = [
    "docker"
    "kvm"
  ];

  # Plenty of third-party build tooling (Unreal Engine, etc.) hardcodes
  # #!/bin/bash shebangs and chain-execs sibling scripts directly, which
  # breaks on NixOS since only /bin/sh is provisioned by default.
  system.activationScripts.binbash.text = ''
    mkdir -m 0755 -p /bin
    ln -sf ${pkgs.bash}/bin/bash /bin/bash
  '';

  environment.systemPackages = with pkgs; [
    gh
    ripgrep
    fd
    fzf
    bat
    eza
    lsof
    nixd
    direnv
    nix-direnv
  ];

  home-manager.users.${config.noodles.user} = {
    programs.direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
