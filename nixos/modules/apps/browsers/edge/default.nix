{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.browsers.edge.enable = lib.mkEnableOption "Enable Edge.";
  };

  config = lib.mkIf config.noodles.browsers.edge.enable {
    environment.systemPackages = [ pkgs.microsoft-edge ];
  };
}
