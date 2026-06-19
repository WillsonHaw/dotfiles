# Kitty - GPU-accelerated terminal emulator with ligature and image support.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.shell.kitty.enable = lib.mkEnableOption "Enable Kitty.";
  };

  config = lib.mkIf config.noodles.shell.kitty.enable {
    home-manager.users.${config.noodles.user} = {
      programs.kitty = {
        enable = true;
        shellIntegration.enableZshIntegration = true;
        themeFile = "Catppuccin-Mocha";
        font = {
          name = "Monaspace Argon";
          size = 10;
        };
        extraConfig = ''
          symbol_map U+23FB-U+23FE,U+2665,U+26A1,U+2B58,U+E000-U+E00A,U+E0A0-U+E0A3,U+E0B0-U+E0C8,U+E0CA,U+E0CC-U+E0D4,U+E200-U+E2A9,U+E300-U+E3E3,U+E5FA-U+E6B1,U+E700-U+E7C5,U+EA60-U+EBEB,U+F000-U+F2FF,U+F300-U+F372,U+F400-U+F532,U+F0001-U+F1AF0 Symbols Nerd Font Mono
        '';
      };
    };
  };
}
