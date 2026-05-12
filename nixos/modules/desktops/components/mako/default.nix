# Mako - Lightweight Wayland notification daemon.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.mako.enable = lib.mkEnableOption "Enable mako.";
  };

  config = lib.mkIf config.noodles.desktops.components.mako.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = [ pkgs.mako ];

      services.mako = {
        enable = true;

        settings = {
          font = "liberation sans 10";
          sort = "+time";

          default-timeout = 7500;
          max-icon-size = 32;
          border-radius = 8;
          max-visible = 5;
        };
      };
    };
  };
}
