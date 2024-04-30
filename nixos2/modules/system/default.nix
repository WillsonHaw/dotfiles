{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./audio
    ./bluetooth
    ./brightness
    ./fonts
    ./networking
    ./nvidia
    ./polkit
    ./print
    ./xdg
  ];
}
