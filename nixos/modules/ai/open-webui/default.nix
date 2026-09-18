# Open WebUI - browser chat interface backed by the local Ollama server.
{
  config,
  lib,
  ...
}:

let
  cfg = config.noodles.ai.open-webui;
in
{
  options.noodles.ai.open-webui.enable = lib.mkEnableOption "Open WebUI chat interface for Ollama.";

  config = lib.mkIf cfg.enable {
    assertions = [
      {
        assertion = config.noodles.ai.ollama.enable;
        message = "noodles.ai.open-webui requires noodles.ai.ollama.enable = true.";
      }
    ];

    services.open-webui = {
      enable = true;
      host = "0.0.0.0";
      environment.OLLAMA_API_BASE_URL = "http://127.0.0.1:${toString config.services.ollama.port}";
    };

    networking.firewall.extraCommands = lib.concatMapStrings (src: ''
      iptables -A nixos-fw -p tcp -s ${src} --dport ${toString config.services.open-webui.port} -j nixos-fw-accept
    '') config.noodles.ai.allowedSources;
  };
}
