{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.browsers.floorp.enable = lib.mkEnableOption "Enable Floorp.";
  };

  config = lib.mkIf config.noodles.browsers.floorp.enable {
    environment.systemPackages = [ pkgs.floorp ];
  };
}
