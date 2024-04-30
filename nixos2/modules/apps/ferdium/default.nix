{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    home.packages = [ pkgs.ferdium ];
  };
}
