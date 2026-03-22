# Eww - Elkowar's Wacky Widgets, a custom widget system for Wayland and X11.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.eww.enable = lib.mkEnableOption "Enable Eww.";
  };

  config = lib.mkIf config.noodles.desktops.components.eww.enable {
    home-manager.users.${config.noodles.user} = {
      programs.eww.enable = true;
      programs.eww.configDir = ./.config;
    };
  };
}
