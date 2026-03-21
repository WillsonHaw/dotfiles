{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.unetbootin.enable = lib.mkEnableOption "Enable UNetbootin.";
  };

  config = lib.mkIf config.noodles.apps.unetbootin.enable {
    environment.systemPackages = with pkgs; [ unetbootin ];
  };
}
