{
  config,
  lib,
  pkgs,
  ...
}:

{
  noodles.system.nvidia.enable = true;

  hardware.nvidia = {
    prime = {
      intelBusId = "PCI:0:2:0";
      nvidiaBusId = "PCI:1:0:0";

      offload = {
        enable = true;
        enableOffloadCmd = true;
      };
    };

    package = config.boot.kernelPackages.nvidiaPackages.latest;
    open = true;

    powerManagement.finegrained = true;
  };

  boot.extraModprobeConfig = ''
    options nvidia_drm fbdev=1
  '';
}
