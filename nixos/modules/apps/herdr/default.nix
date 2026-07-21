# herdr - Agent multiplexer that lives in your terminal.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.herdr.enable = lib.mkEnableOption "Enable herdr.";
  };

  config = lib.mkIf config.noodles.apps.herdr.enable {
    environment.systemPackages = [ pkgs.herdr ];
  };
}
