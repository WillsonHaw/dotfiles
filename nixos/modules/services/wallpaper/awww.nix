# awww - Efficient animated wallpaper daemon for Wayland, with waypaper GUI frontend.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.wallpaper.awww.enable = lib.mkEnableOption "Enable Awww.";
  };

  config = lib.mkIf config.noodles.services.wallpaper.awww.enable {
    environment.systemPackages = with pkgs; [ waypaper ];

    home-manager.users.${config.noodles.user} = {
      home.packages = with pkgs; [ awww ];
    };
  };
}
