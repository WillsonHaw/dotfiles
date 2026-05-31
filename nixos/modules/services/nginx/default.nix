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
