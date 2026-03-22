# Conky - Lightweight system monitor that renders info directly on the desktop.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.conky.enable = lib.mkEnableOption "Enable Conky.";
  };

  config = lib.mkIf config.noodles.apps.conky.enable {
    environment.systemPackages = with pkgs; [ conky ];
  };
}
