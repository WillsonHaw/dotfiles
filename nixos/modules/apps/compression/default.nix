# Compression - Provides 7-zip and unrar archive utilities.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.compression.p7zip.enable = lib.mkEnableOption "Enable 7-zip.";
    noodles.apps.compression.unrar.enable = lib.mkEnableOption "Enable unrar.";
  };

  config = {
    environment.systemPackages =
      with pkgs;
      [ ]
      ++ (if config.noodles.apps.compression.p7zip.enable then [ p7zip ] else [ ])
      ++ (if config.noodles.apps.compression.unrar.enable then [ unrar ] else [ ]);
  };
}
