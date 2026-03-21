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
      compression = {
        p7zip.enable = true;
        unrar.enable = true;
      };
      godot.enable = true;

      browsers = {
        vivaldi.enable = true;
        zen.enable = true;
      };
    };

    desktops = {
      hyprland.enable = true;
    };

    services = {
      wallpaper = {
        swww.enable = true;
        variety.enable = true;
      };
      nextcloud.enable = true;
      power.tlp.enable = true;
      remmina.enable = true;
      mcontrolcenter.enable = true;
    };
  };
}
