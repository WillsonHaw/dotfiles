{ config, lib, pkgs, ... }:

{
  imports = [
    ./browser.nix
    ./development.nix
    ./wm.nix
    ./productivity.nix
    ./shell/zsh.nix
    ./terminal/kitty.nix
    ./terminal/vim.nix
    ./user.nix
  ];

  programs.home-manager.enable = true;
}
