# Cursor - AI-powered code editor based on VS Code.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.cursor.enable = lib.mkEnableOption "Enable Cursor.";
  };

  config = lib.mkIf config.noodles.apps.cursor.enable {
    environment.systemPackages = [
      inputs.cursor-flake.packages."${pkgs.stdenv.hostPlatform.system}".default
    ];
  };
}
