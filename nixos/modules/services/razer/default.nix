{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.razer.enable = lib.mkEnableOption "Enable OpenRazer.";
  };

  config = lib.mkIf config.noodles.services.razer.enable {
    hardware.openrazer.enable = true;
    hardware.openrazer.users = [ "slumpy?" ];
  };
}
