{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.vlc.enable = lib.mkEnableOption "Enable vlc.";
  };

  config = lib.mkIf config.noodles.apps.vlc.enable {
    environment.systemPackages = [ pkgs.vlc ];
  };
}
