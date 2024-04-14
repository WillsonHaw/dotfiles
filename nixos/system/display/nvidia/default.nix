{ config, lib, pkgs, ... }:

{
  # Load nvidia driver for Xorg and Wayland
  services.xserver.videoDrivers = ["nvidia"];
  
  # Enable OpenGL
  hardware.opengl = {
    enable = true;
    driSupport = true;
    driSupport32Bit = true;
  };

  hardware.nvidia = {
    modesetting.enable = true;
    powerManagement.enable = false;
    powerManagement.finegrained = false;
    open = true;
    nvidiaSettings = true;

    prime = {
      intelBusId = "PCI:0:2:0";
      nvidiaBusId = "PCI:1:0:0";

      offload = {
        enable = true;
        enableOffloadCmd = true;
      };
    };

    package = config.boot.kernelPackages.nvidiaPackages.stable;
    #package = config.boot.kernelPackages.nvidiaPackages.beta;
    #package = config.boot.kernelPackages.nvidiaPackages.production;  # (installs 550)
    #package = config.boot.kernelPackages.nvidiaPackages.vulkan_beta;
    #package = config.boot.kernelPackages.nvidiaPackages.legacy_470;
    #package = config.boot.kernelPackages.nvidiaPackages.legacy_390;
    #package = config.boot.kernelPackages.nvidiaPackages.legacy_340;    package = config.boot.kernelPackages.nvidiaPackages.production;
  };
}
