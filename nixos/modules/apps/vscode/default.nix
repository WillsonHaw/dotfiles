{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.vscode.enable = lib.mkEnableOption "Enable vscode.";
  };

  config = lib.mkIf config.noodles.apps.vscode.enable {
    programs.nix-ld.enable = true;

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        programs.vscode = {
          enable = true;
        };

        home.file."${config.xdg.configHome}/Code/User/settings.json".source = lib.mkForce ./settings.json;
      };
  };
}
