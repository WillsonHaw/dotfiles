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

      waynergyIconBase = ''
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <polyline points="100,80 128,36 156,80" fill="none" stroke="#5E81AC" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="128" y1="36" x2="128" y2="96" stroke="#5E81AC" stroke-width="20" stroke-linecap="round"/>
          <rect x="16" y="108" width="224" height="132" rx="20" fill="#5E81AC"/>
          <rect x="40" y="130" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="78" y="130" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="116" y="130" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="154" y="130" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="192" y="130" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="56" y="162" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="96" y="162" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="136" y="162" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="176" y="162" width="24" height="20" rx="5" fill="white" opacity="0.8"/>
          <rect x="76" y="194" width="104" height="20" rx="5" fill="white" opacity="0.8"/>
        </svg>
      '';

      waynergyIconSvg = pkgs.writeText "waynergy.svg" waynergyIconBase;

      # Stopped variant: same icon with a red diagonal slash.
      waynergyIconSvgOff = pkgs.writeText "waynergy-off.svg" (
        builtins.replaceStrings
          [ "</svg>" ]
          [
            ''<line x1="30" y1="30" x2="222" y2="222" stroke="#af1010" stroke-width="28" stroke-linecap="round"/></svg>''
          ]
          waynergyIconBase
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
          #custom-waynergy {
            background-size: 18px 18px;
            background-repeat: no-repeat;
            background-position: center;
            color: transparent;
          }
          #custom-waynergy.running {
            background-image: url("${waynergyIconSvg}");
          }
          #custom-waynergy.stopped {
            background-image: url("${waynergyIconSvgOff}");
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
            (pkgs.python3.withPackages (p: [ p.requests ]))
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
