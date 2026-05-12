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
  ];

  boot.loader.grub = {
    enable = true;
    device = "/dev/nvme0n1";
    useOSProber = true;
  };

  networking.hostName = "slumpy-desktop";

  system.stateVersion = "23.11";

  noodles = {
    device.gpu.card = "/dev/dri/by-path/pci-0000:09:00.0-card";

    desktops.environment = "hyprland";

    apps.godot.enable = true;
  };
}
