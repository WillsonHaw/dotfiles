# OpenCode - Open source CLI coding agent.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  homeDir = config.users.users.${config.noodles.user}.home;
  ollamaHost = "https://ollama.noodle.fish";
  opencodeConfigPath = "${homeDir}/dotfiles/nixos/modules/development/opencode/opencode.json";

  syncOpencodeModels = pkgs.writeShellScriptBin "sync-opencode-models" ''
    set -euo pipefail
    mkdir -p "$(dirname "${opencodeConfigPath}")"

    ${pkgs.curl}/bin/curl -fsSL "${ollamaHost}/api/tags" | ${pkgs.jq}/bin/jq '
      [ .models[].name ] |
      reduce .[] as $m ({}; .[$m] = {
        "name": $m,
        "tools": true,
        "limit": { "context": 32768, "output": 8192 }
      }) |
      {
        "$schema": "https://opencode.ai",
        "provider": {
          "ollama": {
            "npm": "@ai-sdk/openai-compatible",
            "name": "Ollama (Remote)",
            "options": {
              "baseURL": "${ollamaHost}/v1",
              "apiKey": "ollama"
            },
            "models": .
          }
        }
      }' > "${opencodeConfigPath}"

    echo "Synced models from ${ollamaHost} to ${opencodeConfigPath}"
  '';
in
{
  options = {
    noodles.development.openCode.enable = lib.mkEnableOption "Enable OpenCode.";
  };

  config = lib.mkIf config.noodles.development.openCode.enable {
    environment.systemPackages = [
      pkgs.opencode
      syncOpencodeModels
    ];

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.file.".config/opencode/opencode.json" = {
          source = config.lib.file.mkOutOfStoreSymlink opencodeConfigPath;
        };
      };
  };
}
