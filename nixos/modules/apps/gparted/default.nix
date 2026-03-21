{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.gparted.enable = lib.mkEnableOption "Enable gparted.";
  };

  config = lib.mkIf config.noodles.apps.gparted.enable {
    environment.systemPackages = [ pkgs.gparted ];
  };
}
