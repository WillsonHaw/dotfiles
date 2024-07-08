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
    ./nextcloud
    ./node
    ./power
    ./razer
    ./ssh
    ./tailscale
    ./wallpaper
  ];

  systemd.services.NetworkManager-wait-online.enable = lib.mkForce false;
  systemd.services.systemd-networkd-wait-online.enable = lib.mkForce false;
}
