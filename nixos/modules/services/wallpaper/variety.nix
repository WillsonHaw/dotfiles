{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.variety.enable = lib.mkEnableOption "Enable Variety.";
  };

  config = lib.mkIf config.noodles.services.variety.enable {
    # nixpkgs.overlays = [
    #   (final: prev: {
    #     variety = prev.variety.overrideAttrs (old: {
    #       postPatch = ''
    #         substituteAllInPlace data/scripts/set_wallpaper --replace "WP=$1" "WP=$1\nswww img --resize fit -t random $WP"
    #       '';

    #       # patches = (old.patches or [ ]) ++ [
    #       #   ./variety-swww-support.patch
    #       # ];
    #     });
    #   })
    # ];

    home-manager.users.slumpy = {
      home.packages = with pkgs; [
        (variety.overrideAttrs (oldAttrs: {
          patches = [ ./variety-swww-support.patch ];
        }))
      ];
    };
  };
}
