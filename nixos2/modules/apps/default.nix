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
    ./ferdium
    ./gparted
    ./guitar
    ./steam
    ./vim
    ./vscode
    ./waydroid
  ];
}
