# Flatpak - Sandboxed application distribution framework for Linux.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.flatpak.enable = lib.mkEnableOption "Enable Flatpak.";
  };

  config = lib.mkIf config.noodles.apps.flatpak.enable {
    services.flatpak = {
      enable = true;
      packages = [ "tv.plex.PlexHTPC" ];
    };
  };
}
