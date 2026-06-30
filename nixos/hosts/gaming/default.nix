{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../common.nix
    ../desktop-base.nix
    ./hardware-configuration.nix
    ./graphics.nix
  ];

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  # Resume from swap partition for hibernation
  boot.resumeDevice = "/dev/disk/by-uuid/2c94dec1-4b8a-40ad-aaee-1930c76c124f";

  networking.hostName = "slumpy-gaming";

  system.stateVersion = "23.11";

  noodles = {
    device.gpu.card = "/dev/dri/by-path/pci-0000:01:00.0-card";

    desktops.environment = "hyprland";
  };
}
