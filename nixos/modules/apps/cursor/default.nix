# Cursor - AI-powered code editor based on VS Code.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.cursor.enable = lib.mkEnableOption "Enable Cursor.";
  };

  config = lib.mkIf config.noodles.apps.cursor.enable {
    programs.nix-ld.enable = true;

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        programs.cursor.enable = true;

        home.file."${config.xdg.configHome}/Cursor/User/settings.json".source =
          lib.mkForce ../vscode/settings.json;
      };
  };
}
