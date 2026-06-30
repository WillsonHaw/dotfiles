# Shared VM role — headless remote dev box accessed via VSCode SSH.
# Per-machine entries under hosts/vm-*/ import this and add their own
# hardware-configuration, hostname, stateVersion, and any machine-specific
# service flags (nginx, postgres, etc.).
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

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  zramSwap.enable = true;

  # Common dev ports
  networking.firewall.allowedTCPPorts = [
    3333
  ];
  networking.firewall.allowedTCPPortRanges = [
    {
      from = 3200;
      to = 3210;
    }
    {
      from = 8000;
      to = 8010;
    }
    {
      from = 8080;
      to = 8090;
    }
  ];

  # Headless by default — VSCode Remote SSH connects to sshd. The vscode-server
  # module patches the binaries VSCode pushes to ~/.vscode-server so they
  # actually run on NixOS. Hosts that combine this role with a desktop env
  # (e.g. a dev laptop) can override `noodles.desktops.environment`.
  noodles.desktops.environment = lib.mkDefault null;
  services.vscode-server.enable = true;

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
  ];

  home-manager.users.${config.noodles.user} = {
    programs.direnv = {
      enable = true;
      nix-direnv.enable = true;
    };
  };
}
