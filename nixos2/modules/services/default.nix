{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./git
    ./keyring
    ./mako
    ./node
    ./power
    ./ssh
    ./tailscale
    ./wallpaper
    ./wl-clipboard-rs
  ];
}
