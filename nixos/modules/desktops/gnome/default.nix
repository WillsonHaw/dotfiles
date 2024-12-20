{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.gnome.enable = lib.mkEnableOption "Enable GNOME desktop.";
  };

  config = lib.mkIf config.noodles.desktops.gnome.enable {
    noodles.desktops.module = { };

    services.xserver = {
      enable = true;
      displayManager.gdm.enable = true;
      desktopManager.gnome.enable = true;
    };

    services.udev.packages = with pkgs; [ gnome.gnome-settings-daemon ];

    environment.gnome.excludePackages =
      (with pkgs; [
        # for packages that are pkgs.***
        gnome-photos
        gnome-tour
        gnome-connections
      ])
      ++ (with pkgs.gnome; [
        cheese # webcam tool
        gnome-music
        gnome-terminal
        epiphany # web browser
        geary # email reader
        evince # document viewer
        gnome-characters
        totem # video player
        tali # poker game
        iagno # go game
        hitori # sudoku game
        atomix # puzzle game
      ]);

    environment.systemPackages = (
      with pkgs.gnomeExtensions;
      [
        appindicator
        blur-my-shell
        clipboard-history
        cpufreq
        custom-hot-corners-extended
        dash2dock-lite
        gsconnect
        internet-radio
        media-controls
        openweather
        pop-shell
        systemd-manager
        tactile
        vitals
      ]
    );

    # Maybe one day triple buffering will build and work
    # nixpkgs.config.allowAliases = false;
    # nixpkgs.overlays = [
    #   # GNOME 46: triple-buffering-v4-46
    #   (final: prev: {
    #     gnome = prev.gnome.overrideScope (
    #       gnomeFinal: gnomePrev: {
    #         mutter = gnomePrev.mutter.overrideAttrs (old: {
    #           src = pkgs.fetchgit {
    #             url = "https://gitlab.gnome.org/vanvugt/mutter.git";
    #             rev = "663f19bc02c1b4e3d1a67b4ad72d644f9b9d6970";
    #             sha256 = "sha256-I1s4yz5JEWJY65g+dgprchwZuPGP9djgYXrMMxDQGrs=";
    #           };

    #           buildInputs = old.buildInputs ++ [ final.libdisplay-info ];
    #         });
    #       }
    #     );
    #   })
    # ];

    home-manager.users.slumpy =
      { lib, ... }:
      with lib.hm.gvariant;
      let
        color_yellow = mkTuple [
          1.0
          0.85
          0.0
          1.0
        ];
        color_blue = mkTuple [
          0.0
          5.0e-2
          0.28
          0.25
        ];
        color_cyan = mkTuple [
          0.0
          1.0
          0.66
          1.0
        ];
        color_red = mkTuple [
          1.0
          0.0
          0.0
          1.0
        ];
      in
      {
        dconf = {
          enable = true;

          settings = {
            "org/gnome/desktop/interface".color-scheme = "prefer-dark";

            "org/gnome/shell" = {
              disable-user-extensions = false; # enables user extensions (disabled by default)
              enabled-extensions = [
                "appindicatorsupport@rgcjonas.gmail.com"
                "blur-my-shell@aunetx"
                "clipboard-history@alexsaveau.dev"
                "custom-hot-corners-extended@G-dH.github.com"
                "dash2dock-lite@icedman.github.com"
                "drive-menu@gnome-shell-extensions.gcampax.github.com"
                "gsconnect@andyholmes.github.io"
                "mediacontrols@cliffniff.github.com"
                "native-window-placement@gnome-shell-extensions.gcampax.github.com"
                "systemd-manager@hardpixel.eu"
                "tactile@lundal.io"
                "user-theme@gnome-shell-extensions.gcampax.github.com"
                "Vitals@CoreCoding.com"
                "launch-new-instance@gnome-shell-extensions.gcampax.github.com"
              ];
            };

            "org/gnome/shell/app-switcher" = {
              current-workspace-only = true;
            };

            "org/gnome/desktop/interface" = {
              enable-hot-corners = false;
              clock-show-seconds = true;
            };

            "org/gnome/mutter" = {
              edge-tiling = false;
            };

            # Configure individual extensions
            "org/gnome/shell/extensions/blur-my-shell" = {
              brightness = 0.75;
              noise-amount = 0;
              color = mkTuple [
                0
                0
                0
                0.5
              ];
            };

            "org/gnome/shell/extensions/clipboard-history" = {
              window-width-percentage = 20;
              strip-text = true;
              toggle-private-mode = [ ];
            };

            "org/gnome/shell/extensions/dash2dock-lite" = {
              dock-location = 0;
              animate-icons-unmute = true;
              open-app-animation = true;
              autohide-dash = true;
              autohide-dodge = true;

              shrink-icons = true;
              icon-spacing = 0.25;

              border-thickness = 1;
              border-color = color_yellow;
              background-color = color_blue;

              running-indicator-style = 5;
              running-indicator-color = color_cyan;
              notification-badge-style = 1;
              notification-badge-color = color_red;

              customize-topbar = true;
              topbar-border-thickness = 1;
              topbar-border-color = color_yellow;
              topbar-background-color = color_blue;
              topbar-foreground-color = color_yellow;

              apps-icon = false;
              downloads-icon = true;

              animation-magnify = 0.15;
              animation-spread = 0.4;
              animation-rise = 1;
            };

            "org/gnome/shell/extensions/mediacontrols" = {
              label-width = 300;
            };

            "org/gnome/shell/extensions/tactile" = {
              gap-size = 15;
              grid-cols = 3;
              grid-rows = 2;

              col-0 = 2;
              col-1 = 3;
              col-2 = 2;
              row-0 = 5;
              row-1 = 6;
            };

            "org/gnome/shell/extensions/vitals" = {
              show-gpu = true;
              show-battery = config.noodles.device.is-laptop;
              position-in-panel = 0;
            };

            "org/gnome/shell/extensions/appindicator" = {
              icon-size = 24;
            };

            # Keybinds
            "org/gnome/settings-daemon/plugins/media-keys" = {
              custom-keybindings = [
                "/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0/"
                "/org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1/"
              ];
              help = [ ];
              home = [ "<Super>e" ];
              magnifier = [ "<Super>0" ];
              magnifier-zoom-in = [ "<Super>equal" ];
              magnifier-zoom-out = [ "<Super>minus" ];
              screenreader = [ ];
            };

            "org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom0" = {
              binding = "<Super>grave";
              command = "kitty";
              name = "Launch Terminal";
            };

            "org/gnome/settings-daemon/plugins/media-keys/custom-keybindings/custom1" = {
              binding = "<Shift><Super>s";
              command = "grimblast copy area";
              name = "Snippet";
            };

            "org/gnome/desktop/wm/keybindings" = {
              move-to-monitor-down = [ ];
              move-to-monitor-left = [ ];
              move-to-monitor-right = [ ];
              move-to-monitor-up = [ ];
              move-to-workspace-1 = [ "<Shift><Super>1" ];
              move-to-workspace-2 = [ "<Shift><Super>2" ];
              move-to-workspace-3 = [ "<Shift><Super>3" ];
              move-to-workspace-4 = [ "<Shift><Super>4" ];
              move-to-workspace-left = [ "<Shift><Super>Left" ];
              move-to-workspace-right = [ "<Shift><Super>Right" ];
              panel-run-dialog = [ "<Super>r" ];
              switch-to-workspace-1 = [ "<Super>F1" ];
              switch-to-workspace-2 = [ "<Super>F2" ];
              switch-to-workspace-3 = [ "<Super>F3" ];
              switch-to-workspace-4 = [ "<Super>F4" ];
              switch-to-workspace-left = [ "<Super>Left" ];
              switch-to-workspace-right = [ "<Super>Right" ];
              toggle-tiled-left = [ ];
              toggle-tiled-right = [ ];
              switch-group = [ ];
              switch-group-backward = [ ];
              switch-applications = [ ];
              switch-applications-backward = [ ];
              switch-windows = [ "<Alt>Tab" ];
              switch-windows-backward = [ "<Shift><Alt>Tab" ];
            };

            "wm/preferences" = {
              button-layout = "icon:minimize,maximize,close";
            };
          };
        };
      };
  };
}
