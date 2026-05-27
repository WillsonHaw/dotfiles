{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../dev-base.nix
    ./hardware-configuration.nix
  ];

  # UEFI by default. Swap for grub/BIOS if this machine needs it.
  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  networking.hostName = "slumpy-dev-home";

  # Set during first install — adjust to match the NixOS release you install from.
  system.stateVersion = "25.11";
}
