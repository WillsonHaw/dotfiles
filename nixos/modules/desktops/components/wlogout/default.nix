# wlogout - Wayland logout menu with customizable layout and styling.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.wlogout.enable = lib.mkEnableOption "Enable wlogout.";
  };

  config = lib.mkIf config.noodles.desktops.components.wlogout.enable {
    home-manager.users.${config.noodles.user} = {
      programs.wlogout.enable = true;
    };
  };
}
