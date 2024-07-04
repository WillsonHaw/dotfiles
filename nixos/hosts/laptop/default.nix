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
    ./nvidia.nix
    ../../users/slumpy.nix
  ];

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  networking.hostName = "slumpy-laptop";

  noodles = {
    device.is-laptop = true;

    desktops.hyprland.enable = true;
    desktops.hyprland.card = "/dev/dri/by-path/pci-0000:00:02.0-card";

    browsers.floorp.enable = true;
    browsers.vivaldi.enable = true;
    browsers.thorium.enable = true;

    services.swww.enable = true;
    services.nextcloud.enable = true;
    services.power.enable = true;
  };
}
