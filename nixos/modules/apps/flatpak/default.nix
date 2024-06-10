{
  config,
  lib,
  pkgs,
  ...
}:

{
  services.flatpak = {
    enable = true;
    packages = [ "tv.plex.PlexHTPC" ];
  };
}
