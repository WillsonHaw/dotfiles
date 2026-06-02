# Nginx - HTTP server / reverse proxy. Per-machine opt-in.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options.noodles.services.nginx.enable = lib.mkEnableOption "Enable nginx.";

  config = lib.mkIf config.noodles.services.nginx.enable {
    environment.systemPackages = with pkgs; [
      nginx
    ];

    # Allow bindind to ports 80/443 as a normal user. Nix store
    # paths are immutable, so capabilities are applied to a wrapper at boot.
    security.wrappers.nginx = {
      source = "${pkgs.nginx}/bin/nginx";
      owner = config.noodles.user;
      group = "users";
      capabilities = "cap_net_bind_service+ep";
    };

    services.nginx = {
      enable = true;
      appendConfig = "daemon off;";
      recommendedGzipSettings = true;
      recommendedOptimisation = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;
    };

    # Forcefully disable the systemd nginx service
    # systemd.services.nginx = {
      # wantedBy = lib.mkForce [ ];

      # serviceConfig = {
      #   AmbientCapabilities = [ "CAP_NET_BIND_SERVICE" ];
      #   CapabilityBoundingSet = [ "CAP_NET_BIND_SERVICE" ];
      #   ProtectHome = false;
      # };
    # };

    networking.firewall.allowedTCPPorts = [
      80
      443
    ];
  };
}
