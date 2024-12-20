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
    ./display
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
