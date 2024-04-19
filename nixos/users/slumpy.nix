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
      ags
      font-awesome
      fontconfig
      mako
      networkmanagerapplet
      nvd
      python312Packages.pywayland
      python312Packages.psutil
      rubik
      qt5ct
      swww
      waybar
    ];
  };
}
