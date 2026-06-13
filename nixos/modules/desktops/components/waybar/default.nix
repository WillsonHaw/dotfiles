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
      configJsonc = pkgs.writeText "waybar-config.jsonc" (
        builtins.replaceStrings
          [ "\"BAT1\"" "\"ADP1\"" ]
          [ "\"${battery}\"" "\"${adapter}\"" ]
          (builtins.readFile ./.config/config.jsonc)
      );
      waybarConfigDir = pkgs.runCommand "waybar-config-dir" { } ''
        cp -r ${./.config}/. $out
        chmod -R u+w $out
        cp ${configJsonc} $out/config.jsonc
      '';
    in
    lib.mkIf config.noodles.desktops.components.waybar.enable {
      home-manager.users.${config.noodles.user} =
        { config, ... }:
        {
          home.file."${config.xdg.configHome}/waybar" = {
            source = waybarConfigDir;
          };

          programs.waybar.enable = true;
        };
    };
}
