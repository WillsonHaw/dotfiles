{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ../common.nix
    ./hardware-configuration.nix
    ./nvidia.nix
    ../../system/audio
    ../../system/development/node
    ../../system/development/vscode
    ../../system/display/kde
    ../../system/display/nvidia
    ../../system/gaming/steam
    ../../system/hyprland
    ../../system/keyring
    ../../system/networking
    ../../system/polkit
    ../../system/power/tlp
    ../../system/shell/zsh
    ../../system/ssh
    ../../system/tailscale
    ../../system/wl-clipboard-rs
    ../../system/xdg
    ../../profiles/slumpy.nix
  ];

  boot.loader.grub = {
    enable = true;
    device = "/dev/nvme0n1";
    useOSProber = true;
  };

  services = {
    printing.enable = true;
    blueman.enable = true;
  };

  hardware = {
    brillo.enable = true;

    bluetooth = {
      enable = true; # enables support for Bluetooth
      powerOnBoot = true; # powers up the default Bluetooth controller on boot
    };
  };

  programs.light.enable = true;

  networking.hostName = "slumpy-desktop"; # Define your hostname.
}
