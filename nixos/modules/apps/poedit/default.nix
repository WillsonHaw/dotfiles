# Poedit - Translation editor for gettext PO files.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.poedit.enable = lib.mkEnableOption "Enable poedit.";
  };

  config = lib.mkIf config.noodles.apps.poedit.enable {
    environment.systemPackages = [ pkgs.poedit ];
  };
}
