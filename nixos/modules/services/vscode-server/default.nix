# VS Code Server - lets VS Code Remote SSH run its server on NixOS.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    inputs.vscode-server.nixosModules.default
  ];

  options.noodles.services.vscode-server.enable =
    lib.mkEnableOption "VS Code Remote SSH server support";

  config = lib.mkIf config.noodles.services.vscode-server.enable {
    services.vscode-server = {
      enable = true;
      nodejsPackage = pkgs.nodejs_22;
    };
  };
}
