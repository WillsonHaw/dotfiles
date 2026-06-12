{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    ../dev-base.nix
    ../desktop-defaults.nix
    ./hardware-configuration.nix
    ./graphics.nix
  ];

  boot.kernelPackages = pkgs.linuxPackages_zen;

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  # TODO: Set `boot.resumeDevice` to the swap partition UUID once this host is
  # installed on real hardware. See hosts/laptop/default.nix for reference.

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

  networking.hostName = "slumpy-laptop-komodo";

  system.stateVersion = "25.11";

  noodles = {
    device = {
      is-laptop = true;
      # TODO: Confirm the GPU card path after install with
      # `ls /dev/dri/by-path/`.
      gpu.card = "/dev/dri/by-path/pci-0000:00:02.0-card";
    };

    apps = {
      antigravity.enable = true;
      cursor.enable = true;
      godot.enable = true;
    };

    desktops.environment = "niri";

    services = {
      power.tlp.enable = true;
    };

    development = {
      volta.enable = true;
    };
  };
}
