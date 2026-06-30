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

  networking.hostName = "slumpy-vm-noodlefish";

  # Set during first install — adjust to match the NixOS release you install from.
  system.stateVersion = "25.11";
}
