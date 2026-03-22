{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../common.nix
    ./hardware-configuration.nix
    ./graphics.nix
    ../../users/slumpy.nix
  ];

  boot.kernelPackages = pkgs.linuxPackages_zen;

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  networking.hostName = "slumpy-laptop";

  system.stateVersion = "23.11";

  noodles = {
    user = "slumpy";

    device = {
      is-laptop = true;
      gpu.card = "/dev/dri/by-path/pci-0000:00:02.0-card";
    };

    apps = {
      godot.enable = true;
    };

    desktops.environment = "niri";

    services = {
      power.tlp.enable = true;
      mcontrolcenter.enable = true;
    };
  };
}
