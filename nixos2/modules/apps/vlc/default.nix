{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = [ pkgs.vlc ];
}
