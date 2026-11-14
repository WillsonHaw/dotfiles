# Ollama - local LLM inference server, GPU-accelerated via CUDA.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.ai.ollama;
in
{
  options.noodles.ai.ollama.enable = lib.mkEnableOption "Ollama local LLM server.";

  config = lib.mkIf cfg.enable {
    nix.settings = {
      substituters = [ "https://cache.nixos-cuda.org" ];
      trusted-public-keys = [ "cache.nixos-cuda.org:74DUi4Ye579gUqzH4ziL9IyiJBlDpMRn9MBN8oNan9M=" ];
    };

    services.ollama = {
      enable = true;
      package = pkgs.ollama-cuda;
      host = "0.0.0.0";
      environmentVariables = {
        OLLAMA_FLASH_ATTENTION = "1";
        OLLAMA_KV_CACHE_TYPE = "q8_0";
        OLLAMA_KEEP_ALIVE = "30m";
      };
    };

    networking.firewall.extraCommands = lib.concatMapStrings (src: ''
      iptables -A nixos-fw -p tcp -s ${src} --dport ${toString config.services.ollama.port} -j nixos-fw-accept
    '') config.noodles.ai.allowedSources;
  };
}
