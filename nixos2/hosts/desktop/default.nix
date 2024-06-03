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

  boot.loader.grub = {
    enable = true;
    device = "/dev/nvme0n1";
    useOSProber = true;
  };

  networking.hostName = "slumpy-desktop";

  zramSwap.enable = true;

  noodles = {
    device.is-laptop = false;

    # desktops.sway.enable = true;
    desktops.hyprland_new.enable = true;
    desktops.hyprland_new.card = "/dev/dri/by-path/pci-0000:09:00.0-card";
    desktops.kde.enable = true;
    # desktops.gnome.enable = true;

    # browsers.floorp.enable = true;
    browsers.vivaldi.enable = true;
  };
}
