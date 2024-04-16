{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../home/brave
    ../home/ferdium
    ../home/git
    ../home/hyprland
    ../home/kitty
    ../home/vim
    ../home/vscode
    ../home/waybar
    ../home/zsh
  ];

  programs.home-manager.enable = true;
}
