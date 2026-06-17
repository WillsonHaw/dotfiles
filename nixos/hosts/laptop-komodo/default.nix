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
#    ./graphics.nix
  ];

  boot.kernelPackages = pkgs.linuxPackages_zen;

  # Disable Panel Self-Refresh and Panel Replay on Intel Arc xe driver.
  # PSR defers display updates as a power-saving measure, causing visible
  # cursor stutter at 120 Hz.
  boot.kernelParams = [
    "xe.enable_psr=0"
    "xe.enable_panel_replay=0"
  ];

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

  # Intel Arc B390 hardware acceleration packages.
  # programs.niri enables hardware.graphics by default; this adds the
  # Intel-specific VA-API and VPL drivers for GPU-accelerated video decode.
  hardware.graphics.extraPackages = with pkgs; [
    intel-media-driver
    vpl-gpu-rt
  ];

  environment.sessionVariables.LIBVA_DRIVER_NAME = "iHD";

  services.power-profiles-daemon.enable = true;

  # Remap F20 (macro key) to Super so it triggers Niri compositor shortcuts.
  services.keyd = {
    enable = true;
    keyboards.default = {
      ids = [ "*" ];
      settings.main.f20 = "leftmeta";
    };
  };

  networking.hostName = "slumpy-laptop-komodo";

  system.stateVersion = "25.11";

  noodles = {
    device = {
      is-laptop = true;
      # TODO: Confirm the GPU card path after install with
      # `ls /dev/dri/by-path/`.
      gpu.card = "/dev/dri/by-path/pci-0000:00:02.0-card";
      battery = "BAT0";
      battery-adapter = "AC";
    };

    apps = {
      #antigravity.enable = true;
      #cursor.enable = true;
      #godot.enable = true;
      waynergy.enable = true;
    };

    desktops.environment = "niri";

    services = {
      #power.tlp.enable = true;
    };

    development = {
      volta.enable = true;
    };
  };
}
