{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    services.flameshot = {
      enable = true;
      settings = {
        General = {
          showStartupLaunchMessage = false;
        };
      };
    };
  };
}
