{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./apps
    ./desktops
    ./services
    ./shell
    ./system
  ];
}
