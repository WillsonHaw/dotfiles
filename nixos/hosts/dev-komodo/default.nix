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

  networking.hostName = "slumpy-dev-komodo";

  # Set during first install — adjust to match the NixOS release you install from.
  system.stateVersion = "25.11";

  # Machine-specific services.
  noodles.services.nginx.enable = true;
  noodles.development = {
    volta.enable = true;
    # android-studio.enable = true;
  };
}
