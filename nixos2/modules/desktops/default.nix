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
    ./modules
    ./kde
    ./sway
  ];
}
