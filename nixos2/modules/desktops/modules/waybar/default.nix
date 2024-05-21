{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.module.waybar.enable = lib.mkEnableOption "Enable waybar.";
  };

  config = lib.mkIf config.noodles.desktops.module.waybar.enable {
    home-manager.users.slumpy =
      { config, ... }:
      {
        home.file."${config.xdg.configHome}/waybar" = {
          source = ./.config;
        };

        programs.waybar.enable = true;
      };
  };
}
