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

  services.logind.extraConfig = "RuntimeDirectorySize=4G";

  networking.hostName = "slumpy-gaming";

  zramSwap.enable = true;

  noodles = {
    device.is-laptop = false;

    desktops = {
      hyprland.enable = true;
      hyprland.card = "/dev/dri/by-path/pci-0000:01:00.0-card";
    };

    apps = {
      p7zip.enable = true;
      unrar.enable = true;
      godot.enable = true;
      office.enable = true;
      obs.enable = true;
    };

    browsers = {
      floorp.enable = true;
      vivaldi.enable = true;
      thorium.enable = true;
    };

    services = {
      razer.enable = true;
      swww.enable = true;
      nextcloud.enable = true;
    };
  };
}
