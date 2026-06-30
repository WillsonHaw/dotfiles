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
  noodles.services = {
    nginx.enable = true;
    nfs = {
      enable = true;
      openFirewall = true;
      shares = {
        repos = {
          path = "/home/${config.noodles.user}/repos";
          hosts = [ "*" ];
        };
      };
    };
    samba = {
      enable = true;
      openFirewall = true;
      wsdd.enable = true;

      shares = {
        repos = {
          path = "/home/${config.noodles.user}/repos";
          validUsers = [ config.noodles.user ];
        };
      };
    };
  };

  noodles.development = {
    volta.enable = true;
    # android-studio.enable = true;
  };
}
