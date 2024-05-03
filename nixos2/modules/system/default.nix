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
    ./disk
    ./fonts
    ./networking
    ./nvidia
    ./polkit
    ./print
    ./xdg
  ];
}
