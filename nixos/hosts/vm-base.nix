# Shared VM role — headless remote dev box accessed via VSCode SSH.
# Per-machine entries under hosts/vm-*/ import this and add their own
# hardware-configuration, hostname, stateVersion, and any machine-specific
# service flags (nginx, postgres, etc.).
{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./common.nix
  ];

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  zramSwap.enable = true;

  # Headless by default. Hosts that combine this role with a desktop env
  # (e.g. a dev laptop) can override `noodles.desktops.environment`.
  noodles.desktops.environment = lib.mkDefault null;
  noodles.services.vscode-server.enable = true;

  # Advertise hostname on the LAN so other machines can reach this VM by name.
  services.avahi = {
    enable = true;
    publish = {
      enable = true;
      addresses = true;
    };
    openFirewall = true;
  };

  # Docker for containerized dev workflows.
  virtualisation.docker.enable = true;
  users.users.${config.noodles.user}.extraGroups = [
    "docker"
    "kvm"
  ];

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
    kitty.terminfo
  ];

  home-manager.users.${config.noodles.user} = {
    programs.direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
