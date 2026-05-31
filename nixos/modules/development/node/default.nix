# Node - NodeJS & related tools
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.development.node.enable = lib.mkEnableOption "Enable Node.js.";
  };

  config = lib.mkIf config.noodles.development.node.enable {
    environment.systemPackages = with pkgs; [
      nodejs_20
      pnpm
    ];
  };
}
