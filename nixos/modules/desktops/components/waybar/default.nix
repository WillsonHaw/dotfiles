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

  config = lib.mkIf config.noodles.desktops.components.waybar.enable {
    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.file."${config.xdg.configHome}/waybar" = {
          source = ./.config;
        };

        programs.waybar.enable = true;
      };
  };
}
