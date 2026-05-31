# Volta - JavaScript tool manager
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.development.volta.enable = lib.mkEnableOption "Enable Volta.";
  };

  config = lib.mkIf config.noodles.development.volta.enable {
    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.packages = with pkgs; [
          volta
        ];

        # Ensure Volta's shims are on the PATH for shells and the user session
        home.sessionVariables = {
          PATH = "$PATH:${config.home.homeDirectory}/.volta/bin";
        };
      };

    # Enable nix-ld for Volta to work properly with Node.js versions that require native modules.
    programs.nix-ld.enable = true;
  };
}
