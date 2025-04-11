{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./clipboard
    ./git
    ./keyring
    ./mcontrolcenter
    ./nextcloud
    ./node
    ./power
    ./razer
    ./rdp
    ./ssh
    ./tailscale
    ./wallpaper
    ./wireguard
  ];

  systemd.services.NetworkManager-wait-online.enable = lib.mkForce false;
  systemd.services.systemd-networkd-wait-online.enable = lib.mkForce false;
}
