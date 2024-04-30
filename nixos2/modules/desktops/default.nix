{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./hyprland
    ./kde
    ./rofi
    ./sway
    ./waybar
    ./wlogout
  ];
}
