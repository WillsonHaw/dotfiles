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
  # noodles.services = {
  #   nginx.enable = true;
  #   samba = {
  #     enable = true;
  #     openFirewall = true;
  #     wsdd.enable = true;

  #     shares = {
  #       share = {
  #         path = "/home/${config.noodles.user}/repos";
  #         validUsers = [ config.noodles.user ];
  #       };
  #     };
  #   };
  # };
  services.samba = {
    enable = true;
    securityType = "user";
    openFirewall = true;
    settings = {
      global = {
        "workgroup" = "WORKGROUP";
        "server string" = "smbnix";
        "netbios name" = "smbnix";
        "security" = "user";
        #"use sendfile" = "yes";
        #"max protocol" = "smb2";
        # note: localhost is the ipv6 localhost ::1
        # "hosts allow" = "192.168.0. 127.0.0.1 localhost";
        # "hosts deny" = "0.0.0.0/0";
      };
    };
  };

  services.samba-wsdd = {
    enable = true;
    openFirewall = true;
  };

  networking.firewall.enable = true;
  networking.firewall.allowPing = true;

  noodles.development = {
    volta.enable = true;
    # android-studio.enable = true;
  };
}
