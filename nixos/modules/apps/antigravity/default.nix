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
        programs.antigravity = {
          enable = true;
          profiles.default.extensions = import ../vscode/extensions.nix { inherit lib pkgs; };
        };

        home.file."${config.xdg.configHome}/Antigravity/User/settings.json".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/settings.json"
        );

        home.file."${config.xdg.configHome}/Antigravity/User/keybindings.json".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/keybindings.json"
        );

        home.file."${config.xdg.configHome}/Antigravity/User/snippets".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/vscode/snippets"
        );
      };
  };
}
