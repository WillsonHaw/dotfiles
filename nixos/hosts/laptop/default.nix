{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../common.nix
    ../desktop-defaults.nix
    ./hardware-configuration.nix
    ./graphics.nix
  ];

  boot.kernelPackages = pkgs.linuxPackages_zen;

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  # Resume from swap partition for hibernation
  boot.resumeDevice = "/dev/disk/by-uuid/0cd225ed-f707-4db6-8add-5a386ce79e37";

  # Disable USB and other devices from waking the system
  # (prevents immediate wake after hibernate/suspend)
  services.udev.extraRules = ''
    ACTION=="add", SUBSYSTEM=="usb", ATTR{power/wakeup}="disabled"
  '';

  systemd.sleep.settings.Sleep = {
    AllowSuspend = "yes";
    AllowHibernation = "yes";
    AllowSuspendThenHibernate = "yes";
    HibernateDelaySec = "3600";
  };

  networking.hostName = "slumpy-laptop";

  system.stateVersion = "23.11";

  noodles = {
    device = {
      is-laptop = true;
      gpu.card = "/dev/dri/by-path/pci-0000:00:02.0-card";
    };

    apps = {
      antigravity.enable = true;
      cursor.enable = true;
      godot.enable = true;
      waynergy.enable = true;
    };

    desktops.environment = "niri";

    services = {
      power.tlp.enable = true;
      mcontrolcenter.enable = true;
    };
  };
}
