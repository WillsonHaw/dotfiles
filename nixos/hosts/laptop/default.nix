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

    apps = {
      p7zip.enable = true;
      unrar.enable = true;
      godot.enable = true;
    };

    desktops = {
      # kde.enable = true;
      # gnome.enable = true;
      hyprland.enable = true;
      hyprland.card = "/dev/dri/by-path/pci-0000:00:02.0-card";
    };

    browsers = {
      # brave.enable = true;
      # floorp.enable = true;
      vivaldi.enable = true;
      # thorium.enable = true;
      # edge.enable = false;
      zen.enable = true;
    };

    services = {
      swww.enable = true;
      variety.enable = true;
      nextcloud.enable = true;
      power.tlp.enable = true;
      # power.cpufreq.enable = true;
      remmina.enable = true;
      mcontrolcenter.enable = true;
    };
  };
}
