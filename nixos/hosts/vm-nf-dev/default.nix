{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../vm-base.nix
    ./hardware-configuration.nix
  ];

  networking.hostName = "slumpy-vm-nf-dev";

  # Set during first install — adjust to match the NixOS release you install from.
  system.stateVersion = "25.11";

  noodles = {
    development = {
      free-claude-code.enable = true;
    };
  };
}
