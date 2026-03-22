# Node - JavaScript runtime with Volta for managing Node.js versions.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = [ pkgs.volta ];
}
