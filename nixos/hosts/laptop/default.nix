{ config, lib, pkgs, ... }:

{
  imports = [
    ../common.nix
    ./hardware-configuration.nix
    ../../system/audio
    ../../system/development/vscode
    ../../system/display/kde
    ../../system/display/nvidia
    ../../system/gaming/steam
    ../../system/hyprland
    ../../system/networking
    ../../system/power/tlp
    ../../system/shell/zsh
    ../../system/ssh
    ../../system/xdg
    ../../profiles/slumpy.nix
  ];

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  services.printing.enable = true;

  networking.hostName = "slumpy-laptop"; # Define your hostname.
}
