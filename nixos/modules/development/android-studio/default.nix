# android - androidJS & related tools
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.development.android-studio.enable = lib.mkEnableOption "Enable Android Studio.";
  };

  config = lib.mkIf config.noodles.development.android-studio.enable {
    environment.systemPackages = with pkgs; [
      android-studio
    ];

    nixpkgs.config.android_sdk.accept_license = true;
  };
}
