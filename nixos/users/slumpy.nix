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
      font-awesome
      fontconfig
      grimblast
      mako
      networkmanagerapplet
      nvd
      python312Packages.pywayland
      python312Packages.psutil
      rubik
      qt5ct
      swww
    ];
  };
}
