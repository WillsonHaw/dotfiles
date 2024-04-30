{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
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
}
