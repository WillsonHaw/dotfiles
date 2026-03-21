{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.waydroid.enable = lib.mkEnableOption "Enable Waydroid.";
  };

  config = lib.mkIf config.noodles.apps.waydroid.enable {
    virtualisation.waydroid.enable = true;
  };
}
