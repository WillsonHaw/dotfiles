# ComfyUI - node-based diffusion model GUI, for image and video generation workflows.
#
# Not packaged in nixpkgs with CUDA support (its from-source torch build isn't
# cached anywhere and would mean compiling PyTorch locally). Installed instead
# the way upstream recommends: a uv-managed venv that pulls PyTorch's prebuilt
# CUDA wheel, running ComfyUI's source fetched straight from GitHub.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.ai.comfyui;
  version = "0.36.0";

  comfyuiSrc = pkgs.fetchFromGitHub {
    owner = "comfyanonymous";
    repo = "ComfyUI";
    tag = "v${version}";
    hash = "sha256-OPiB6qcItN5abQlps+js83z6Jw1kxP4NILoxpdO0fdw=";
  };

  dataDir = "/var/lib/comfyui";
  venvDir = "${dataDir}/venv";
in
{
  options.noodles.ai.comfyui = {
    enable = lib.mkEnableOption "ComfyUI image/video generation server.";

    port = lib.mkOption {
      type = lib.types.port;
      default = 8188;
      description = "Port the ComfyUI web server listens on.";
    };
  };

  config = lib.mkIf cfg.enable {
    # opencv-python (a ComfyUI dependency) is a prebuilt wheel expecting
    # standard FHS shared libraries nix-ld doesn't provide by default.
    programs.nix-ld.libraries = with pkgs; [
      libGL
      glib
      libSM
      libXext
      libXrender
    ];

    users.groups.comfyui = { };
    users.users.comfyui = {
      isSystemUser = true;
      group = "comfyui";
      home = dataDir;
    };

    systemd.tmpfiles.rules = [
      "d ${dataDir} 0750 comfyui comfyui -"
      "d ${dataDir}/custom_nodes 0750 comfyui comfyui -"
      "d ${dataDir}/input 0750 comfyui comfyui -"
      "d ${dataDir}/output 0750 comfyui comfyui -"
      "d ${dataDir}/models 0750 comfyui comfyui -"
      "d ${dataDir}/user 0750 comfyui comfyui -"
    ];

    systemd.services.comfyui = {
      description = "ComfyUI image and video generation server";
      wantedBy = [ "multi-user.target" ];
      wants = [ "network-online.target" ];
      after = [ "network-online.target" ];

      path = [ pkgs.uv ];

      environment = {
        HOME = dataDir;
        XDG_CACHE_HOME = "${dataDir}/.cache";
        # torch's pip wheel bundles CUDA's math libraries but not the driver's
        # userspace libs (libcuda.so, libnvidia-ml.so) - on NixOS those live
        # under /run/opengl-driver/lib instead of a standard FHS path.
        LD_LIBRARY_PATH = "/run/opengl-driver/lib";
      };

      preStart = ''
        if [ ! -f "${venvDir}/.install-complete" ]; then
          uv venv --clear --relocatable --prompt comfyui --python 3.13 --python-preference only-managed "${venvDir}"
          uv pip install --python "${venvDir}/bin/python" torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cu130
          uv pip install --python "${venvDir}/bin/python" -r ${comfyuiSrc}/requirements.txt
          touch "${venvDir}/.install-complete"
        fi
      '';

      serviceConfig = {
        Type = "simple";
        User = "comfyui";
        Group = "comfyui";
        WorkingDirectory = "${comfyuiSrc}";
        ExecStart = "${venvDir}/bin/python ${comfyuiSrc}/main.py --listen 0.0.0.0 --port ${toString cfg.port} --base-directory ${dataDir}";
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
