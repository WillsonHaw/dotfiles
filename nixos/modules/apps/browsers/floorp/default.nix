# Floorp - Privacy-focused Firefox fork with enhanced customization options.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.floorp.enable = lib.mkEnableOption "Enable Floorp.";
  };

  config = lib.mkIf config.noodles.apps.browsers.floorp.enable {
    environment.systemPackages = [ pkgs.floorp ];
  };
}
