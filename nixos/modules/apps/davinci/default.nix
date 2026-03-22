# DaVinci Resolve - Professional video editing and color grading suite.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.davinci.enable = lib.mkEnableOption "Enable DaVinci Resolve.";
  };

  config = lib.mkIf config.noodles.apps.davinci.enable {
    environment.systemPackages = [ pkgs.davinci-resolve ];
  };
}
