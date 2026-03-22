{
  config,
  lib,
  pkgs,
  ...
}:

{
  config = lib.mkIf (config.noodles.desktops.environment == "cosmic") {
    services.desktopManager.cosmic.enable = true;
    services.displayManager.cosmic-greeter.enable = true;

    environment.sessionVariables = {
      NIXOS_OZONE_WL = "1";
    };
  };
}
