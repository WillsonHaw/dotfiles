{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.power.enable = lib.mkEnableOption "Enable power management (for laptops).";
  };

  imports = [ ./tlp ];

  config.services.upower.enable = true;
}
