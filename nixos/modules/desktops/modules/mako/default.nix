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
        sort = "+time";

        font = "liberation sans 10";
        borderColor = "#cba6f7";
        borderRadius = 8;
        backgroundColor = "#1e1e2e";
        maxIconSize = 32;
        maxVisible = 5;
      };
    };
  };
}
