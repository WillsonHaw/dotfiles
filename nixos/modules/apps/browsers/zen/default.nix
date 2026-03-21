{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.zen.enable = lib.mkEnableOption "Enable Zen Browser.";
  };

  config = lib.mkIf config.noodles.apps.browsers.zen.enable {
    environment.systemPackages = [
      inputs.zen-browser.packages."${pkgs.stdenv.hostPlatform.system}".default
    ];
  };
}
