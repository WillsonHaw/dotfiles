{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.ferdium.enable = lib.mkEnableOption "Enable ferdium.";
  };

  config = lib.mkIf config.noodles.apps.ferdium.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = [ pkgs.ferdium ];
    };
  };
}
