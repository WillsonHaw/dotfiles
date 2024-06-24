{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.office.enable = lib.mkEnableOption "Enable LibreOffice.";
  };

  config = lib.mkIf config.noodles.apps.office.enable {
    environment.systemPackages = with pkgs; [
      libreoffice
      okular
    ];
  };
}
