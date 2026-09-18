# wayvnc - VNC server for wlroots-protocol Wayland compositors, used to
# remote-desktop into the laptop's Niri session (e.g. from Remmina).
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.services.wayvnc;
in
{
  options.noodles.services.wayvnc = {
    enable = lib.mkEnableOption "wayvnc VNC server";

    port = lib.mkOption {
      type = lib.types.port;
      default = 5900;
      description = "TCP port wayvnc listens on.";
    };

    openFirewall = lib.mkEnableOption "Open the wayvnc port in the firewall";
  };

  config = lib.mkIf cfg.enable (
    let
      rootConfig = config;
    in
    {
      networking.firewall.allowedTCPPorts = lib.mkIf cfg.openFirewall [ cfg.port ];

      home-manager.users.${rootConfig.noodles.user} =
        { config, ... }:
        let
          username = rootConfig.noodles.user;
          secretPath = rootConfig.sops.secrets.wayvnc_pw.path;
          tlsDir = "${config.xdg.dataHome}/wayvnc";

          launcherScript = pkgs.writeShellScript "wayvnc-launch" ''
            if [ ! -f "${secretPath}" ]; then
              echo "wayvnc: ${secretPath} not decrypted yet, skipping" >&2
              exit 0
            fi

            mkdir -p "${tlsDir}"

            if [ ! -f "${tlsDir}/key.pem" ]; then
              ${pkgs.openssl}/bin/openssl req -x509 -newkey rsa:2048 -days 3650 -nodes \
                -keyout "${tlsDir}/key.pem" -out "${tlsDir}/cert.pem" -subj "/CN=wayvnc" \
                2>/dev/null
            fi

            runtime_config="$XDG_RUNTIME_DIR/wayvnc-config"
            umask 077
            {
              echo "address=0.0.0.0"
              echo "port=${toString cfg.port}"
              echo "enable_auth=true"
              echo "username=${username}"
              printf 'password=%s\n' "$(cat "${secretPath}")"
              echo "private_key_file=${tlsDir}/key.pem"
              echo "certificate_file=${tlsDir}/cert.pem"
            } > "$runtime_config"

            exec ${pkgs.wayvnc}/bin/wayvnc --config="$runtime_config"
          '';
        in
        {
          systemd.user.services.wayvnc = {
            Unit = {
              Description = "wayvnc VNC server";
              PartOf = [ "graphical-session.target" ];
              After = [ "graphical-session.target" ];
            };

            Service = {
              ExecStart = "${launcherScript}";
              Restart = "on-failure";
              RestartSec = "3";
            };

            Install.WantedBy = [ "graphical-session.target" ];
          };
        };
    }
  );
}
