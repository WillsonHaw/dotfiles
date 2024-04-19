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
    ../../system/ags
    ../../system/anyrun
    ../../system/audio
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

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  # # Laptop can't correctly suspend if wlan is active
  # powerManagement = {
  #   powerDownCommands = ''
  #     ${pkgs.util-linux}/bin/rfkill block wlan
  #   '';
  #   resumeCommands = ''
  #     ${pkgs.util-linux}/bin/rfkill unblock wlan
  #   '';
  # };

  services.printing.enable = true;
  programs.light.enable = true;

  networking.hostName = "slumpy-laptop"; # Define your hostname.
}
