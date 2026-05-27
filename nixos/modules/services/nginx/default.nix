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
    services.nginx = {
      enable = true;
      recommendedGzipSettings = true;
      recommendedOptimisation = true;
      recommendedProxySettings = true;
      recommendedTlsSettings = true;
    };

    networking.firewall.allowedTCPPorts = [
      80
      443
    ];
  };
}
