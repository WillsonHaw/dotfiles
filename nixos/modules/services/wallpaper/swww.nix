{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.wallpaper.swww.enable = lib.mkEnableOption "Enable Swww.";
  };

  config = lib.mkIf config.noodles.services.wallpaper.swww.enable {
    environment.systemPackages = with pkgs; [ waypaper ];

    home-manager.users.${config.noodles.user} = {
      home.packages = with pkgs; [ swww ];
    };
  };
}
