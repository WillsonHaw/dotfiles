{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.mcontrolcenter.enable = lib.mkEnableOption "Enable MControlCenter for MSI laptops.";
  };

  config = lib.mkIf config.noodles.services.mcontrolcenter.enable {
    environment.systemPackages = [
      pkgs.mcontrolcenter
    ];
  };
}
