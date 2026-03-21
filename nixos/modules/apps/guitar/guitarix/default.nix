{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.guitar.guitarix.enable = lib.mkEnableOption "Enable Guitarix.";
  };

  config = lib.mkIf config.noodles.apps.guitar.guitarix.enable {
    environment.systemPackages = with pkgs; [ guitarix ];
  };
}
