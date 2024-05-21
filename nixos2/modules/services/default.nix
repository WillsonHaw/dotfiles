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
    ./node
    ./power
    ./ssh
    ./tailscale
    ./wallpaper
    ./wl-clipboard-rs
  ];

  systemd.services.NetworkManager-wait-online.enable = lib.mkForce false;
  systemd.services.systemd-networkd-wait-online.enable = lib.mkForce false;
}
