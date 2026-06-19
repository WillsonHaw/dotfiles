# VS Code - Microsoft's extensible code editor, configured with nix-ld for compatibility.
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
          profiles.default.extensions = with pkgs.vscode-extensions; [
            catppuccin.catppuccin-vsc
            catppuccin.catppuccin-vsc-icons
          ];
        };

        home.file."${config.xdg.configHome}/Code/User/settings.json".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/settings.json"
        );
      };
  };
}
