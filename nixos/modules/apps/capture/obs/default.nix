{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.obs.enable = lib.mkEnableOption "Enable OBS Studio.";
  };

  config = lib.mkIf config.noodles.apps.obs.enable {
    environment.systemPackages = with pkgs; [ obs-studio ];
  };
}
