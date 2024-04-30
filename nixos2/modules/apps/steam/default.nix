{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.steam = {
    enable = true;
    remotePlay.openFirewall = true; # Open ports in the firewall for Steam Remote Play
    gamescopeSession.enable = true;
  };

  # home.packages = with pkgs; [
  #   steam
  # ];
}