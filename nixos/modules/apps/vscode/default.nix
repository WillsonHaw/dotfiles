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
          profiles.default.extensions = import ./extensions.nix { inherit lib pkgs; };
        };

        home.file."${config.xdg.configHome}/Code/User/settings.json".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/settings.json"
        );

        home.file."${config.xdg.configHome}/Code/User/keybindings.json".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/keybindings.json"
        );

        home.file."${config.xdg.configHome}/Code/User/snippets".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/snippets"
        );
      };
  };
}
