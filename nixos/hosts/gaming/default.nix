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
    ./graphics.nix
    ../../users/slumpy.nix
  ];

  boot.loader = {
    systemd-boot.enable = true;
    efi.canTouchEfiVariables = true;
  };

  services.logind.extraConfig = "RuntimeDirectorySize=4G";

  networking.hostName = "slumpy-gaming";

  zramSwap.enable = true;

  system.stateVersion = "23.11";

  noodles = {
    user = "slumpy";

    device = {
      is-laptop = false;
      gpu.card = "/dev/dri/by-path/pci-0000:01:00.0-card";
    };

    desktops.environment = "hyprland";

    apps = {
      office.enable = true;
      capture.obs.enable = true;
    };

    services = {
      razer.enable = true;
    };
  };
}
