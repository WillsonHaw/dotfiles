{ config, lib, pkgs, ... }:

{
  imports = [ 
    ./common.nix
  ];

  home = {
    username = "slumpy";
    homeDirectory = "/home/slumpy";
    stateVersion = "23.11";
    
    packages = with pkgs; [
      waybar
      mako
      libnotify
      swww
      rofi-wayland
      networkmanagerapplet
    ];
  };
}
