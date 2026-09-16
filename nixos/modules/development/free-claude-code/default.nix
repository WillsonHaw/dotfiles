# Free Claude Code - multi-provider proxy for running coding agents against free-tier LLM providers.
{
  config,
  lib,
  ...
}:

{
  options = {
    noodles.development.free-claude-code.enable = lib.mkEnableOption "Enable Free Claude Code.";
  };

  config = lib.mkIf config.noodles.development.free-claude-code.enable {
    programs.nix-ld.enable = true;

    home-manager.users.${config.noodles.user} = {
      home.sessionPath = [
        "$HOME/.local/bin"
        "$HOME/.cargo/bin"
      ];
    };
  };
}
