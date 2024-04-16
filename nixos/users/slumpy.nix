{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [ ./common.nix ];

  home = {
    username = "slumpy";
    homeDirectory = "/home/slumpy";
    stateVersion = "23.11";

    packages = with pkgs; [
      libnotify
      mako
      networkmanagerapplet
      nvd
      font-awesome
      rofi-wayland
      swww
      waybar
    ];
  };
}
