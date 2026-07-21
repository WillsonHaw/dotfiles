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
    ../desktop-base.nix
    ./hardware-configuration.nix
  ];

  boot.kernelPackages = pkgs.linuxPackages_zen;

  # Disable Panel Self-Refresh and Panel Replay on Intel Arc xe driver.
  # PSR defers display updates as a power-saving measure, causing visible
  # cursor stutter at 120 Hz.
  boot.kernelParams = [
    "xe.enable_psr=0"
    "xe.enable_panel_replay=0"
    "resume_offset=246552576"
  ];

  boot.loader = {
    systemd-boot.enable = true;
    systemd-boot.configurationLimit = 10;
    efi.canTouchEfiVariables = true;
  };

  boot.resumeDevice = "/dev/disk/by-uuid/2527fdc0-04be-4c92-80e9-bc6784e70bfa";

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

  environment.sessionVariables = {
    LIBVA_DRIVER_NAME = "iHD";
  };

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

  boot.supportedFilesystems = [ "nfs" ];

  fileSystems."/mnt/komodo" = {
    device = "slumpy-vm-komodo:/home/${config.noodles.user}/repos";
    fsType = "nfs";
    options = [
      "x-systemd.automount"
      "noauto"
      "x-systemd.idle-timeout=600"
      "nfsvers=4.1"
      "soft"
      "timeo=15"
    ];
  };

  noodles = {
    development = {
      node.enable = true;
    };

    services = {
      nginx.enable = true;
      nfs = {
        enable = true;
        openFirewall = true;
        shares = {
          repos = {
            path = "/home/${config.noodles.user}/repos";
            hosts = [ "*" ];
          };
        };
      };
      samba = {
        enable = true;
        openFirewall = true;
        wsdd.enable = true;

        shares = {
          repos = {
            path = "/home/${config.noodles.user}/repos";
            validUsers = [ config.noodles.user ];
          };
        };
      };
    };

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
      browsers.edge.enable = true;
      herdr.enable = true;
    };

    system.display.externalDisplays = [
      {
        # Samsung Odyssey G93SC connected via Thunderbolt (currently DP-8).
        # Trailing * matches the serial suffix in the description; run
        # `niri msg outputs` to see the full string.
        criteria = "Samsung Electric Company Odyssey G93SC *";
        # Preferred mode is 1680x1440; no explicit mode needed.
        logicalWidth = 1680;
        disableInternal = true;
      }
      {
        # RayNeo XR glasses.  Run `niri msg outputs` while connected to
        # confirm the make/model string and replace "DP-1" if needed.
        criteria = "DP-1";
        mode = "1920x1080";
        # Glasses replace the laptop screen rather than extending it.
        disableInternal = true;
        # logicalWidth auto-derived from mode: 1920
      }
    ];

    desktops.environment = "niri";

    services = {
      #power.tlp.enable = true;
    };

    development = {
      adb.enable = true;
      volta.enable = true;
    };
  };
}
