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
    # desktops.hyprland.enable = true;
    # desktops.kde.enable = true;
    desktops.gnome.enable = true;

    browsers.vivaldi.enable = true;
  };
}
