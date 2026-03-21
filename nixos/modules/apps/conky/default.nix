{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.conky.enable = lib.mkEnableOption "Enable Conky.";
  };

  config = lib.mkIf config.noodles.apps.conky.enable {
    environment.systemPackages = with pkgs; [ conky ];
  };
}
