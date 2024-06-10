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
    ./mako
    ./rofi
    ./thunar
    ./waybar
    ./wlogout
  ];
}
