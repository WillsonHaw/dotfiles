{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.browsers.zen.enable = lib.mkEnableOption "Enable Zen Browser.";
  };

  config = lib.mkIf config.noodles.browsers.zen.enable {
    environment.systemPackages = [
      inputs.zen-browser.packages."${pkgs.system}".default
    ];
  };
}
