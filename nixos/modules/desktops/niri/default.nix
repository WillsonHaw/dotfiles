# Niri - Scrollable tiling Wayland compositor with Catppuccin theming.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    inputs.catppuccin.nixosModules.catppuccin
  ];

  config =
    let
      rootConfig = config;
    in
    lib.mkIf (config.noodles.desktops.environment == "niri") {
      noodles.desktops.components = {
        ags.enable = true;
        rofi.enable = true;
        mako.enable = true;
        thunar.enable = true;
        wlogout.enable = true;
      };

      programs.niri.enable = true;

      security.pam.services.hyprlock = { };

      environment = {
        sessionVariables = {
          NIXOS_OZONE_WL = "1";
          XDG_CURRENT_DESKTOP = "niri";
        };

        systemPackages = with pkgs; [
          xwayland-satellite
          hyprlock
          swayidle
          swaybg
          nwg-look
          grim
          imagemagick
        ];
      };

      xdg = {
        autostart.enable = true;
        portal = {
          enable = true;
          extraPortals = [ pkgs.xdg-desktop-portal-gnome pkgs.xdg-desktop-portal-gtk ];
          config.niri = {
            default = [ "gnome" "gtk" ];
            "org.freedesktop.impl.portal.RemoteDesktop" = [ "gnome" ];
            "org.freedesktop.impl.portal.ScreenCast" = [ "gnome" ];
          };
        };
      };


      home-manager.users.${config.noodles.user} =
        {
          config,
          ...
        }:
        {
          imports = [ inputs.catppuccin.homeModules.catppuccin ];

          gtk = {
            enable = true;
            gtk4.theme = null;
          };

          catppuccin = {
            enable = true;
            autoEnable = true;
            flavor = "mocha";
            accent = "mauve";

            cursors.enable = true;
            kvantum.enable = true;
          };

          programs.zsh.initContent = lib.mkOrder 500 ''
            # Auto-start niri on tty1
            if [ -z "$DISPLAY" ] && [ -z "$WAYLAND_DISPLAY" ] && [ "$(tty)" = "/dev/tty1" ]; then
              exec niri-session
            fi
          '';

          xdg.configFile."hypr/hyprlock.conf".text = ''
            background {
              monitor     =
              path        = screenshot
              blur_passes = 3
              blur_size   = 7
              noise       = 0.012
              contrast    = 0.9
              brightness  = 0.8
              vibrancy    = 0.15
            }

            label {
              monitor     =
              text        = cmd[update:1000] date "+%H:%M"
              color       = rgba(205, 214, 244, 1.0)
              font_size   = 80
              font_family = Iosevka Nerd Font
              position    = 0, 200
              halign      = center
              valign      = center
              shadow_passes = 2
              shadow_size   = 5
            }

            label {
              monitor     =
              text        = cmd[update:60000] date "+%A, %B %d"
              color       = rgba(205, 214, 244, 0.75)
              font_size   = 22
              font_family = Iosevka Nerd Font
              position    = 0, 120
              halign      = center
              valign      = center
              shadow_passes = 1
              shadow_size   = 3
            }

            input-field {
              monitor           =
              size              = 260, 52
              outline_thickness = 3
              dots_size         = 0.26
              dots_spacing      = 0.64
              outer_color       = rgb(49, 50, 68)
              inner_color       = rgb(30, 30, 46)
              font_color        = rgb(205, 214, 244)
              fade_on_empty     = true
              fade_timeout      = 1000
              placeholder_text  = <i>Password…</i>
              rounding          = 26
              check_color       = rgb(137, 180, 250)
              fail_color        = rgb(243, 139, 168)
              fail_text         = <i>Wrong password ($ATTEMPTS)</i>
              position          = 0, -20
              halign            = center
              valign            = center
            }

            label {
              monitor     =
              text        = cmd[update:0] curl -sS "https://icanhazdadjoke.com/" -H "Accept: text/plain" --max-time 5 2>/dev/null | fold -s -w 90 | head -4 || echo "I asked my dog what two minus two is. He said nothing."
              color       = rgba(166, 173, 200, 0.65)
              font_size   = 13
              font_family = Iosevka Nerd Font
              text_align  = center
              position    = 0, -340
              halign      = center
              valign      = center
              shadow_passes = 1
              shadow_size   = 2
            }
          '';

          home.file."${config.xdg.configHome}/niri/config.kdl".source =
            config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/niri/config.kdl";

          # Use specified GPU for niri
          home.file."${config.xdg.configHome}/niri/card" = lib.mkIf (
            rootConfig.noodles.device.gpu.card != ""
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.device.gpu.card; };
        };
    };
}
