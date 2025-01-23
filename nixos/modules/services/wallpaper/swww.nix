{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.swww.enable = lib.mkEnableOption "Enable Swww.";
  };

  config = lib.mkIf config.noodles.services.swww.enable {
    environment.systemPackages = with pkgs; [ waypaper ];

    home-manager.users.slumpy = {
      home.packages = with pkgs; [ swww ];
    };
  };
}
