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

  # Headless — VSCode Remote SSH connects to sshd. The vscode-server module
  # patches the binaries VSCode pushes to ~/.vscode-server so they actually
  # run on NixOS.
  noodles.desktops.environment = null;
  services.vscode-server.enable = true;

  # Docker for containerized dev workflows.
  virtualisation.docker.enable = true;
  users.users.${config.noodles.user}.extraGroups = [ "docker" ];

  environment.systemPackages = with pkgs; [
    gh
    ripgrep
    fd
    fzf
    bat
    eza
  ];

  home-manager.users.${config.noodles.user} = {
    programs.direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
