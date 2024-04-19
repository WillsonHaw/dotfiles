{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../home/ags
    ../home/anyrun
    ../home/brave
    ../home/ferdium
    ../home/flameshot
    ../home/fontconfig
    ../home/git
    ../home/hyprland
    ../home/kitty
    ../home/rofi
    ../home/ssh
    ../home/sway
    ../home/vim
    ../home/vscode
    ../home/waybar
    ../home/wlogout
    ../home/zsh
  ];

  programs.home-manager.enable = true;
}
