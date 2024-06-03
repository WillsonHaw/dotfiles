{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  home-manager.users.slumpy = {
    home.packages = [ inputs.hyprland-contrib.packages.${pkgs.system}.grimblast ];
  };
}
