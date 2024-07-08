{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.nix-ld.enable = true;

  home-manager.users.slumpy = {
    programs.vscode = {
      enable = true;
    };
  };
}
