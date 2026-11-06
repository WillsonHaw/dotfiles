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

  networking.hostName = "slumpy-vm-komodo";

  # Set during first install — adjust to match the NixOS release you install from.
  system.stateVersion = "25.11";

  # Machine-specific services.
  noodles = {
    development.node.enable = true;

    services.nginx.enable = true;
  };

  noodles.development = {
    volta.enable = true;
    # android-studio.enable = true;
  };
}
