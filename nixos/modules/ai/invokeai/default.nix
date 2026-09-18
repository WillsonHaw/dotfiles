# InvokeAI - image and (experimental) video generation.
#
# Not packaged in nixpkgs with CUDA support (its from-source torch build isn't
# cached anywhere and would mean compiling PyTorch locally). Installed instead
# the way upstream recommends: a uv-managed venv that pulls PyTorch's prebuilt
# CUDA wheel, wrapped in a systemd unit so it still behaves like a normal
# NixOS-managed service.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.ai.invokeai;
  version = "6.14.1";
  dataDir = "/var/lib/invokeai";
  venvDir = "${dataDir}/venv";
  rootDir = "${dataDir}/root";
in
{
  options.noodles.ai.invokeai = {
    enable = lib.mkEnableOption "InvokeAI image/video generation server.";

    port = lib.mkOption {
      type = lib.types.port;
      default = 9090;
      description = "Port the InvokeAI web server listens on.";
    };
  };

  config = lib.mkIf cfg.enable {
    users.groups.invokeai = { };
    users.users.invokeai = {
      isSystemUser = true;
      group = "invokeai";
      home = dataDir;
    };

    systemd.tmpfiles.rules = [
      "d ${dataDir} 0750 invokeai invokeai -"
      "d ${rootDir} 0750 invokeai invokeai -"
    ];

    systemd.services.invokeai = {
      description = "InvokeAI image and video generation server";
      wantedBy = [ "multi-user.target" ];
      wants = [ "network-online.target" ];
      after = [ "network-online.target" ];

      path = [ pkgs.uv ];

      environment = {
        HOME = dataDir;
        XDG_CACHE_HOME = "${dataDir}/.cache";
      };

      preStart = ''
        if [ ! -x "${venvDir}/bin/invokeai-web" ]; then
          uv venv --clear --relocatable --prompt invoke --python 3.12 --python-preference only-managed "${venvDir}"
          uv pip install --python "${venvDir}/bin/python" "invokeai==${version}" --torch-backend=cu128
        fi

        if [ ! -f "${rootDir}/invokeai.yaml" ]; then
          cat > "${rootDir}/invokeai.yaml" <<EOF
        schema_version: 4.0.2
        host: 0.0.0.0
        port: ${toString cfg.port}
        EOF
        fi
      '';

      serviceConfig = {
        Type = "simple";
        User = "invokeai";
        Group = "invokeai";
        WorkingDirectory = dataDir;
        ExecStart = "${venvDir}/bin/invokeai-web --root ${rootDir}";
        Restart = "always";
        RestartSec = "5s";
        # First run downloads several GB of CUDA/PyTorch wheels, well past systemd's default 90s.
        TimeoutStartSec = "infinity";

        NoNewPrivileges = true;
        DevicePolicy = "closed";
        PrivateDevices = false;
        DeviceAllow = [
          # CUDA - https://docs.nvidia.com/dgx/pdf/dgx-os-5-user-guide.pdf
          "char-nvidiactl"
          "char-nvidia-caps"
          "char-nvidia-frontend"
          "char-nvidia-uvm"
        ];
      };
    };

    networking.firewall.extraCommands = lib.concatMapStrings (src: ''
      iptables -A nixos-fw -p tcp -s ${src} --dport ${toString cfg.port} -j nixos-fw-accept
    '') config.noodles.ai.allowedSources;
  };
}
