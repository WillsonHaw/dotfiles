{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = [ pkgs.volta ];
}
