{ config, lib, pkgs, ... }:

{
  # xdg.configFile."./.config".source = ../../config;

  imports = [
    ../home/brave
    ../home/ferdium
    ../home/git
    ../home/hyprland
    ../home/kitty
    ../home/vim
    ../home/vscode
    ../home/zsh
  ];

  programs.home-manager.enable = true;
}
