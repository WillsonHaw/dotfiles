# Tailscale - Zero-config WireGuard-based mesh VPN service.
{ config, lib, pkgs, ... }:

{
  services.tailscale.enable = true;

  # Once the socket is ready, register the primary user as the operator so
  # tailscale up/down work without sudo — both from waybar and the shell.
  systemd.services.tailscaled.postStart = ''
    until [ -S /run/tailscale/tailscaled.sock ]; do sleep 0.1; done
    ${pkgs.tailscale}/bin/tailscale set --operator=${config.noodles.user}
  '';

  home-manager.users.${config.noodles.user} = {
    xdg.dataFile."icons/hicolor/scalable/apps/tailscale.svg".source =
      "${pkgs.tailscale.src}/client/systray/tailscale.svg";
  };
}
