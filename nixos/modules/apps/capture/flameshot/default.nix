{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.capture.flameshot.enable = lib.mkEnableOption "Enable flameshot.";
  };

  config = lib.mkIf config.noodles.apps.capture.flameshot.enable {
    home-manager.users.${config.noodles.user} = {
      services.flameshot = {
        enable = true;
        settings = {
          General = {
            showStartupLaunchMessage = false;
          };
        };
      };
    };
  };
}
