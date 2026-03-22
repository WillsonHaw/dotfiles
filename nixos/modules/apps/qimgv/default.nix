# qimgv - Fast Qt-based image viewer with video support.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.qimgv.enable = lib.mkEnableOption "Enable qimgv.";
  };

  config = lib.mkIf config.noodles.apps.qimgv.enable {
    environment.systemPackages = [ pkgs.qimgv ];
  };
}
