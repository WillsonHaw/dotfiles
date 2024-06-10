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
