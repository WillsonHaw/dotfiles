# Hockey analyzer - GPU video analysis worker that CoolerDuty pushes jobs to.
#
# Put ANALYZER_SECRET=... in the environment file before enabling.
{
  config,
  lib,
  ...
}:

let
  cfg = config.noodles.ai.hockey-analyzer;
in
{
  options.noodles.ai.hockey-analyzer = {
    enable = lib.mkEnableOption "Hockey video analyzer for CoolerDuty.";

    version = lib.mkOption {
      type = lib.types.str;
      default = "0.1.0";
      description = "Image tag published to GHCR from the hockey-analyzer repo.";
    };

    image = lib.mkOption {
      type = lib.types.str;
      default = "ghcr.io/willsonhaw/hockey-analyzer:${cfg.version}";
      defaultText = lib.literalExpression ''"ghcr.io/willsonhaw/hockey-analyzer:''${version}"'';
      description = "Container image to run. Set to a localhost/ image to test a local podman build.";
    };

    registryTokenFile = lib.mkOption {
      type = lib.types.nullOr lib.types.path;
      default = null;
      description = "File containing a GitHub token with read:packages, needed only if the GHCR package is private.";
    };

    port = lib.mkOption {
      type = lib.types.port;
      default = 8000;
      description = "Host port the analyzer API listens on.";
    };

    dataDir = lib.mkOption {
      type = lib.types.path;
      default = "/var/lib/hockey-analyzer";
      description = "Host directory for the job queue, downloads, and model cache.";
    };

    environmentFile = lib.mkOption {
      type = lib.types.path;
      default = "/var/lib/hockey-analyzer/analyzer.env";
      description = "File containing ANALYZER_SECRET=..., kept out of the Nix store.";
    };
  };

  config = lib.mkIf cfg.enable {
    hardware.nvidia-container-toolkit.enable = true;
    virtualisation.podman.enable = true;
    virtualisation.oci-containers.backend = "podman";

    systemd.tmpfiles.rules = [
      "d ${cfg.dataDir} 0750 root root -"
    ];

    virtualisation.oci-containers.containers.hockey-analyzer = {
      image = cfg.image;
      pull = "missing";
      ports = [ "${toString cfg.port}:8000" ];
      volumes = [ "${cfg.dataDir}:/data:U" ];
      devices = [ "nvidia.com/gpu=all" ];
      environmentFiles = [ cfg.environmentFile ];
      environment = {
        DATA_DIR = "/data";
        DEVICE = "cuda";
        PORT = "8000";
      };
      login = lib.mkIf (cfg.registryTokenFile != null) {
        registry = "ghcr.io";
        username = "willsonhaw";
        passwordFile = toString cfg.registryTokenFile;
      };
    };

    networking.firewall.extraCommands = lib.concatMapStrings (src: ''
      iptables -A nixos-fw -p tcp -s ${src} --dport ${toString cfg.port} -j nixos-fw-accept
    '') config.noodles.ai.allowedSources;
  };
}
