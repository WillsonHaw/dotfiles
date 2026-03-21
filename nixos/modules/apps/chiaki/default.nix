{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.chiaki.enable = lib.mkEnableOption "Enable chiaki.";
  };

  config = lib.mkIf config.noodles.apps.chiaki.enable {
    environment.systemPackages = with pkgs; [ chiaki-ng ];
  };
}
