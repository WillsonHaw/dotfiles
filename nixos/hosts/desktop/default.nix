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

  boot.loader.grub = {
    enable = true;
    device = "/dev/nvme0n1";
    useOSProber = true;
  };

  services.logind.extraConfig = "RuntimeDirectorySize=4G";

  networking.hostName = "slumpy-desktop";

  zramSwap.enable = true;

  system.stateVersion = "23.11";

  noodles = {
    user = "slumpy";

    device = {
      is-laptop = false;
      gpu.card = "/dev/dri/by-path/pci-0000:09:00.0-card";
    };

    desktops = {
      hyprland.enable = true;
    };

    apps = {
      godot.enable = true;
      capture.obs.enable = true;
    };

    services = {
      razer.enable = true;
    };
  };
}
