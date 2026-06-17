# Antigravity - Google's agentic IDE based on VS Code.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.antigravity.enable = lib.mkEnableOption "Enable Antigravity.";
  };

  config = lib.mkIf config.noodles.apps.antigravity.enable {
    programs.nix-ld.enable = true;

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        programs.antigravity.enable = true;

        home.file."${config.xdg.configHome}/Antigravity/User/settings.json".source =
          lib.mkForce ../vscode/settings.json;
      };
  };
}
