{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.brave.enable = lib.mkEnableOption "Enable Brave.";
  };

  config = lib.mkIf config.noodles.apps.browsers.brave.enable {
    environment.systemPackages = [ pkgs.brave ];
  };
}
