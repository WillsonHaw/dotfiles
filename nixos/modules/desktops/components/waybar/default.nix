# Waybar - Highly customizable status bar for Wayland compositors.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.waybar.enable = lib.mkEnableOption "Enable waybar.";
  };

  config =
    let
      battery = config.noodles.device.battery;
      adapter = config.noodles.device.battery-adapter;

      tailscaleSvg = "${pkgs.tailscale.src}/client/systray/tailscale.svg";

      # Disconnected variant: original SVG with a red diagonal slash added.
      tailscaleSvgOff = pkgs.writeText "tailscale-off.svg" (
        builtins.replaceStrings
          [ "</svg>" ]
          [
            ''<line x1="30" y1="30" x2="222" y2="222" stroke="#af1010" stroke-width="28" stroke-linecap="round"/></svg>''
          ]
          (builtins.readFile "${pkgs.tailscale.src}/client/systray/tailscale.svg")
      );

      configJsonc = pkgs.writeText "waybar-config.jsonc" (
        builtins.replaceStrings [ "\"BAT1\"" "\"ADP1\"" ] [ "\"${battery}\"" "\"${adapter}\"" ] (
          builtins.readFile ./.config/config.jsonc
        )
      );

      # Bake both SVG paths into the CSS so no runtime icon-theme lookup is needed.
      styleCss = pkgs.writeText "waybar-style.css" (
        (builtins.readFile ./.config/style.css)
        + ''

          #custom-tailscale {
            background-size: 18px 18px;
            background-repeat: no-repeat;
            background-position: center;
            color: transparent;
          }
          #custom-tailscale.connected {
            background-image: url("${tailscaleSvg}");
          }
          #custom-tailscale.disconnected {
            background-image: url("${tailscaleSvgOff}");
          }
        ''
      );

      waybarConfigDir = pkgs.runCommand "waybar-config-dir" { } ''
        cp -r ${./.config}/. $out
        chmod -R u+w $out
        chmod +x $out/scripts/*.sh
        cp ${configJsonc} $out/config.jsonc
        cp ${styleCss} $out/style.css
      '';
    in
    lib.mkIf config.noodles.desktops.components.waybar.enable {
      home-manager.users.${config.noodles.user} =
        { config, ... }:
        {
          home.packages = [
            pkgs.gsimplecal
            pkgs.libnotify
          ];

          xdg.configFile."gsimplecal/config".text = ''
            close_on_unfocus = 1
            show_timezones = 0
            main_window_indent = 10
            mark_today = 1
          '';

          home.file."${config.xdg.configHome}/waybar" = {
            source = waybarConfigDir;
          };

          programs.waybar.enable = true;
        };
    };
}
