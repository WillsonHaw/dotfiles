{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.p7zip.enable = lib.mkEnableOption "Enable 7-zip.";
    noodles.apps.unrar.enable = lib.mkEnableOption "Enable unrar.";
  };

  config = {
    environment.systemPackages =
      with pkgs;
      [ ]
      ++ (if config.noodles.apps.p7zip.enable then [ p7zip ] else [ ])
      ++ (if config.noodles.apps.unrar.enable then [ unrar ] else [ ]);
  };
}
