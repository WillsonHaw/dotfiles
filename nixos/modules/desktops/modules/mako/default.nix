{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.module.mako.enable = lib.mkEnableOption "Enable mako.";
  };

  config = lib.mkIf config.noodles.desktops.module.mako.enable {
    home-manager.users.slumpy = {
      home.packages = [ pkgs.mako ];

      services.mako = {
        enable = true;
        sort = "+time";

        font = "liberation sans 10";
        borderRadius = 8;
        maxIconSize = 32;
        maxVisible = 5;
        defaultTimeout = 7500;
      };
    };
  };
}
