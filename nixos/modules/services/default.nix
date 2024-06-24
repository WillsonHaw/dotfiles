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
    ./nextcloud
    ./node
    ./power
    ./razer
    ./ssh
    ./tailscale
    ./wallpaper
    ./wl-clipboard-rs
  ];

  systemd.services.NetworkManager-wait-online.enable = lib.mkForce false;
  systemd.services.systemd-networkd-wait-online.enable = lib.mkForce false;
}
