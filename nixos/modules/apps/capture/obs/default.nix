{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.capture.obs.enable = lib.mkEnableOption "Enable OBS Studio.";
  };

  config = lib.mkIf config.noodles.apps.capture.obs.enable {
    environment.systemPackages = with pkgs; [ obs-studio ];
  };
}
