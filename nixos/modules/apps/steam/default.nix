{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.steam.enable = lib.mkEnableOption "Enable steam.";
  };

  config = lib.mkIf config.noodles.apps.steam.enable {
    environment.systemPackages = with pkgs; [
      lutris
      bottles
    ];

    programs = {
      gamemode = {
        enable = true;
        settings.custom = {
          start = "${pkgs.libnotify}/bin/notify-send 'GameMode started'";
          end = "${pkgs.libnotify}/bin/notify-send 'GameMode ended'";
        };
      };
      steam = {
        enable = true;
        remotePlay.openFirewall = true; # Open ports in the firewall for Steam Remote Play
        gamescopeSession.enable = true;
      };
    };

    # home.packages = with pkgs; [
    #   steam
    # ];
  };
}
