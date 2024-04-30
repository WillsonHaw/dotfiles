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
    ./steam
    ./vim
    ./vscode
    ./waydroid
  ];
}
