{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    programs.wlogout.enable = true;
  };
}
