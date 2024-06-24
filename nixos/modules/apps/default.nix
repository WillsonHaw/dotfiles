{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./browsers
    ./capture
    ./chiaki
    ./curl
    # ./davinci
    ./dconf2nix
    ./ferdium
    ./flatpak
    ./gimp
    ./godot
    ./gparted
    ./guitar
    ./office
    ./steam
    ./vim
    ./vlc
    ./vscode
    # ./waydroid
  ];
}
