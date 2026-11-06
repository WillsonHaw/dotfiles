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

  systemd.services.tailscale-src-valid-mark-reset = lib.mkIf config.virtualisation.docker.enable {
    description = "Reset src_valid_mark while Tailscale is disconnected so local containers can start";
    after = [ "tailscaled.service" ];
    wantedBy = [ "multi-user.target" ];
    path = [
      pkgs.tailscale
      pkgs.jq
      pkgs.procps
    ];
    script = ''
      while true; do
        state=$(tailscale status --json 2>/dev/null | jq -r .BackendState)

        if [ "$state" != "Running" ] && [ "$(sysctl -n net.ipv4.conf.all.src_valid_mark)" = 1 ]; then
          sysctl -w net.ipv4.conf.all.src_valid_mark=0
        fi

        sleep 5
      done
    '';
  };

  home-manager.users.${config.noodles.user} = {
    xdg.dataFile."icons/hicolor/scalable/apps/tailscale.svg".source =
      "${pkgs.tailscale.src}/client/systray/tailscale.svg";
  };
}
