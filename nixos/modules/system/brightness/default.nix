# Brightness - Screen brightness control via brillo and brightnessctl.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  hardware.brillo.enable = true;

  environment.systemPackages = [ pkgs.brightnessctl ];
}
