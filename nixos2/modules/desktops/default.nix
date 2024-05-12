{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./gnome
    ./hyprland
    ./kde
    ./rofi
    ./sway
    ./waybar
    ./wlogout
  ];
}
