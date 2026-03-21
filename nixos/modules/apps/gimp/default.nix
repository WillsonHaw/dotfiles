{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.gimp.enable = lib.mkEnableOption "Enable gimp.";
  };

  config = lib.mkIf config.noodles.apps.gimp.enable {
    environment.systemPackages = with pkgs; [ gimp ];
  };
}
