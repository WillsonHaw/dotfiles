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
    ./gparted
    ./guitar
    ./steam
    ./vim
    ./vscode
    ./waydroid
  ];
}
