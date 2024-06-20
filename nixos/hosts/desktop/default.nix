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

    desktops.hyprland_new.enable = true;
    desktops.hyprland_new.card = "/dev/dri/by-path/pci-0000:09:00.0-card";

    apps.godot.enable = true;

    browsers.floorp.enable = false;
    browsers.vivaldi.enable = true;

    services.razer.enable = true;
    services.swww.enable = true;
    services.wallpaperengine.enable = true;
  };
}
