# p4-tunnel - local plain-TCP to TLS forwarder for Helix Core Cloud, so clients
# too old to send SNI (Unreal's bundled p4api on Linux) can still connect.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.services.p4-tunnel;
in
{
  options.noodles.services.p4-tunnel = {
    enable = lib.mkEnableOption "local Perforce TLS tunnel";

    server = lib.mkOption {
      type = lib.types.str;
      example = "example.helixcore.io";
      description = "Hostname of the Helix Core Cloud server.";
    };

    serverPort = lib.mkOption {
      type = lib.types.port;
      default = 1666;
      description = "SSL port of the Perforce server.";
    };

    localPort = lib.mkOption {
      type = lib.types.port;
      default = 1667;
      description = "Port the tunnel listens on at 127.0.0.1.";
    };
  };

  config = lib.mkIf cfg.enable {
    home-manager.users.${config.noodles.user} = {
      systemd.user.services.p4-tunnel = {
        Unit = {
          Description = "Perforce TLS tunnel to ${cfg.server}";
          After = [ "network-online.target" ];
        };

        Service = {
          ExecStart = lib.concatStringsSep " " [
            "${pkgs.socat}/bin/socat"
            "TCP-LISTEN:${toString cfg.localPort},bind=127.0.0.1,reuseaddr,fork"
            "OPENSSL:${cfg.server}:${toString cfg.serverPort},verify=1,snihost=${cfg.server},commonname=${cfg.server}"
          ];
          Restart = "on-failure";
          RestartSec = "3";
        };

        Install.WantedBy = [ "default.target" ];
      };
    };
  };
}
