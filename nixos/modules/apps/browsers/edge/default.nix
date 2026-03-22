# Edge - Microsoft's Chromium-based web browser.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.edge.enable = lib.mkEnableOption "Enable Edge.";
  };

  config = lib.mkIf config.noodles.apps.browsers.edge.enable {
    environment.systemPackages = [ pkgs.microsoft-edge ];
  };
}
