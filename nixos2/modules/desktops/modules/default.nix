{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./mako
    ./rofi
    ./waybar
    ./wlogout
  ];
}
