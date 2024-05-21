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
    ./curl
    ./dconf2nix
    ./ferdium
    ./flatpak
    ./gparted
    ./guitar
    ./steam
    ./vim
    ./vscode
    ./waydroid
  ];
}
