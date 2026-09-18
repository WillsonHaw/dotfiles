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
    services.ollama = {
      enable = true;
      package = pkgs.ollama-cuda;
      host = "0.0.0.0";
    };

    networking.firewall.extraCommands = lib.concatMapStrings (src: ''
      iptables -A nixos-fw -p tcp -s ${src} --dport ${toString config.services.ollama.port} -j nixos-fw-accept
    '') config.noodles.ai.allowedSources;
  };
}
