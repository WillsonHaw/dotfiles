# Tailscale - Zero-config WireGuard-based mesh VPN service.
{ config, lib, pkgs, ... }:

{
  services.tailscale.enable = true;
}
