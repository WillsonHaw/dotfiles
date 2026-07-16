# Claude Code - Anthropic's CLI coding agent.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.development.claude.enable = lib.mkEnableOption "Enable Claude Code.";
  };

  config = lib.mkIf config.noodles.development.claude.enable {
    environment.systemPackages = with pkgs; [
      claude-code
    ];

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.file.".claude/CLAUDE.md".source = config.lib.file.mkOutOfStoreSymlink (
          "${config.home.homeDirectory}/dotfiles/nixos/modules/development/claude/CLAUDE.md"
        );
      };
  };
}
