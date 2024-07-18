{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    programs.btop.enable = true;
  };
}
