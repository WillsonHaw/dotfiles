{
  config,
  lib,
  pkgs,
  ...
}:

{
  networking.firewall = {
    allowedUDPPorts = [ 51820 ]; # Clients and peers can use the same port, see listenport
  };

  # Enable WireGuard
  networking.wireguard.enable = true;
  networking.wg-quick.interfaces.wg0.configFile = "/etc/wireguard/noodlefish.conf";
}
