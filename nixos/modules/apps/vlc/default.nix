# VLC - Cross-platform media player that handles nearly any audio/video format.
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
