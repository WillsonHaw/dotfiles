{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./ags
    ./mako
    ./rofi
    ./waybar
    ./wlogout
  ];
}
