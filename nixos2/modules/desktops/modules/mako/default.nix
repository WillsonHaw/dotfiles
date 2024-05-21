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
    };
  };
}
