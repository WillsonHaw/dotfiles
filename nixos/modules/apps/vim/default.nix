# Vim - Highly configurable terminal text editor.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.vim.enable = lib.mkEnableOption "Enable vim.";
  };

  config = lib.mkIf config.noodles.apps.vim.enable {
    home-manager.users.${config.noodles.user} = {
      programs.vim = {
        enable = true;
        plugins = with pkgs.vimPlugins; [ vim-airline ];
        settings = {
          ignorecase = true;
        };
        extraConfig = ''
          set mouse=a
        '';
      };
    };

    environment.variables.EDITOR = "vim";
  };
}
