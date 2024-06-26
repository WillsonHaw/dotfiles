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

    services.power.enable = true;
    # desktops.gnome.enable = true;
    # desktops.hyprland.enable = true;
    desktops.hyprland.enable = true;
    desktops.hyprland.card = "/dev/dri/by-path/pci-0000:00:02.0-card";

    browsers.vivaldi.enable = true;
    browsers.floorp.enable = true;
  };
}
