# QjackCtl - GUI frontend for the JACK audio connection kit.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.guitar.qjackctl.enable = lib.mkEnableOption "Enable QjackCtl.";
  };

  config = lib.mkIf config.noodles.apps.guitar.qjackctl.enable {
    environment.systemPackages = with pkgs; [ qjackctl ];
  };
}
