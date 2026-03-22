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
      };
    };
  };
}
