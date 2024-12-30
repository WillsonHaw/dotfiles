{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./browsers
    ./btop
    ./capture
    ./chiaki
    ./compression
    ./curl
    # ./davinci
    ./dconf2nix
    ./fastfetch
    ./ferdium
    ./flatpak
    ./gimp
    ./godot
    ./gparted
    ./guitar
    ./office
    ./steam
    # ./unetbootin
    ./vim
    ./vlc
    ./vscode
    # ./waydroid
  ];
}
