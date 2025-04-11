{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.browsers.brave.enable = lib.mkEnableOption "Enable Brave.";
  };

  config = lib.mkIf config.noodles.browsers.brave.enable {
    environment.systemPackages = [ pkgs.brave ];
  };
}
