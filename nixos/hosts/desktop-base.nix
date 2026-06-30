{
  config,
  lib,
  pkgs,
  ...
}:

{
  config = lib.mkMerge [
    {
      # Resolve .local mDNS hostnames (e.g. for NFS mounts to VM hosts).
      services.avahi = {
        enable = true;
        nssmdns4 = true;
        openFirewall = true;
      };

      environment.systemPackages = with pkgs; [
        qdirstat
      ];

      noodles = {
        shell.kitty.enable = true;

        apps = {
          browsers = {
            zen.enable = true;
          };

          chiaki.enable = true;
          # capture.flameshot.enable = true;
          capture.grimblast.enable = true;
          gimp.enable = true;
          gparted.enable = true;
          office.enable = false;
          qimgv.enable = true;
          steam.enable = true;
          vlc.enable = true;
          vscode.enable = true;
          guitar.qjackctl.enable = true;
        };

        services = {
          wallpaper = {
            awww.enable = true;
            # variety.enable = true;
          };
          nextcloud.enable = true;
          remmina.enable = true;
        };
      };
    }

    # Defaults for laptops
    (lib.mkIf config.noodles.device.is-laptop {
      noodles.system.presentation.enable = lib.mkDefault true;
      noodles.system.display.enable = lib.mkDefault true;

      # Authorize Thunderbolt devices (docks, displays) automatically.
      services.hardware.bolt.enable = true;
    })

    # Defaults for desktop-class machines (non-laptops)
    (lib.mkIf (!config.noodles.device.is-laptop) {
      zramSwap.enable = true;
      services.logind.settings.Login.RuntimeDirectorySize = "4G";

      noodles = {
        system.wayland-cache.enable = lib.mkDefault true;
        apps.capture.obs.enable = lib.mkDefault true;
        services.razer.enable = lib.mkDefault true;
      };
    })
  ];
}
