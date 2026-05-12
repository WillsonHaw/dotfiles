# Variety - Automatic wallpaper changer with support for multiple image sources.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.wallpaper.variety.enable = lib.mkEnableOption "Enable Variety.";
  };

  config = lib.mkIf config.noodles.services.wallpaper.variety.enable {
    # nixpkgs.overlays = [
    #   (final: prev: {
    #     variety = prev.variety.overrideAttrs (old: {
    #       postPatch = ''
    #         substituteAllInPlace data/scripts/set_wallpaper --replace "WP=$1" "WP=$1\nawww img --resize fit -t random $WP"
    #       '';

    #       # patches = (old.patches or [ ]) ++ [
    #       #   ./variety-awww-support.patch
    #       # ];
    #     });
    #   })
    # ];

    home-manager.users.${config.noodles.user} = {
      home.packages = with pkgs; [
        (variety.overrideAttrs (oldAttrs: {
          patches = [ ./variety-awww-support.patch ];
        }))
      ];
    };
  };
}
