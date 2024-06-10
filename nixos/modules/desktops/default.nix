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
    ./hyprland_new
    ./modules
    ./kde
    ./sway
  ];
}
