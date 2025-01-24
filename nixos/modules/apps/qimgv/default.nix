{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = [ pkgs.qimgv ];
}
