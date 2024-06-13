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
    ./steam
    ./vim
    ./vlc
    ./vscode
    ./waydroid
  ];
}
