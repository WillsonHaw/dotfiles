# Antigravity - Google's agentic IDE based on VS Code.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.antigravity.enable = lib.mkEnableOption "Enable Antigravity.";
  };

  config = lib.mkIf config.noodles.apps.antigravity.enable {
    environment.systemPackages = [
      inputs.antigravity-nix.packages."${pkgs.stdenv.hostPlatform.system}".default
    ];
  };
}
