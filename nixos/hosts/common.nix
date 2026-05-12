{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../modules
    ../users/slumpy.nix
  ];

  config = lib.mkMerge [
    {
      environment.systemPackages = with pkgs; [
        claude-code
        inotify-tools
        nixfmt
        jq
        unzip
        qdirstat
        cifs-utils
      ];

      nix.settings = {
        download-buffer-size = 524288000; # 500 MiB
        experimental-features = [
          "nix-command"
          "flakes"
        ];
      };

      nixpkgs.config.allowUnfree = true;

      # Workaround: openldap test017 is flaky on nixpkgs-unstable
      nixpkgs.overlays = [
        (final: prev: {
          openldap = prev.openldap.overrideAttrs (old: {
            doCheck = false;
          });
        })
      ];

      users.mutableUsers = false;

      boot.kernelPackages = lib.mkDefault pkgs.linuxPackages_latest;

      time.timeZone = "America/Vancouver";

      i18n.defaultLocale = "en_US.UTF-8";

      programs.mtr.enable = true;
      programs.gnupg.agent = {
        enable = true;
        enableSSHSupport = true;
      };

      nix.gc = {
        automatic = true;
        randomizedDelaySec = "14m";
        options = "--delete-older-than 10d";
      };

      # Enable modules that should be active on all hosts
      noodles = {
        user = lib.mkDefault "slumpy";

        shell = {
          kitty.enable = true;
          zsh.enable = true;
        };

        apps = {
          compression = {
            p7zip.enable = true;
            unrar.enable = true;
          };

          browsers = {
            zen.enable = true;
          };

          btop.enable = true;
          chiaki.enable = true;
          capture.flameshot.enable = true;
          capture.grimblast.enable = true;
          fastfetch.enable = true;
          gimp.enable = true;
          gparted.enable = true;
          office.enable = false;
          qimgv.enable = true;
          steam.enable = true;
          vim.enable = true;
          vlc.enable = true;
          vscode.enable = true;
          guitar.qjackctl.enable = true;
        };

        services = {
          wallpaper = {
            awww.enable = true;
            variety.enable = true;
          };
          nextcloud.enable = true;
          remmina.enable = true;
        };
      };
    }

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
