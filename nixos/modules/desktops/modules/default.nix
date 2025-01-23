{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./ags
    ./eww
    ./hyprpanel
    ./mako
    ./rofi
    ./thunar
    ./waybar
    ./wlogout
  ];
}
