{
  config,
  lib,
  pkgs,
  ...
}:

{
  hardware.nvidia = {
    prime = {
      intelBusId = "PCI:0:2:0";
      nvidiaBusId = "PCI:1:0:0";

      offload = {
        enable = true;
        enableOffloadCmd = true;
      };
    };

    # package = config.boot.kernelPackages.nvidiaPackages.stable;
    package = config.boot.kernelPackages.nvidiaPackages.beta;
    # package = config.boot.kernelPackages.nvidiaPackages.production; # (installs 550)
    # package = config.boot.kernelPackages.nvidiaPackages.vulkan_beta;
    # package = config.boot.kernelPackages.nvidiaPackages.legacy_470;
    # package = config.boot.kernelPackages.nvidiaPackages.legacy_390;
    # package = config.boot.kernelPackages.nvidiaPackages.legacy_340;
  };

  boot.extraModprobeConfig = ''
    options nvidia_drm fbdev=1
  '';
  # options nvidia ${
  #   lib.concatStringsSep " " [
  #     # nvidia assume that by default your CPU does not support PAT,
  #     # but this is effectively never the case in 2023
  #     "NVreg_UsePageAttributeTable=1"
  #     # This may be a noop, but it's somewhat uncertain
  #     "NVreg_EnablePCIeGen3=1"
  #     # This is sometimes needed for ddc/ci support, see
  #     # https://www.ddcutil.com/nvidia/
  #     #
  #     # Current monitor does not support it, but this is useful for
  #     # the future
  #     "NVreg_RegistryDwords=RMUseSwI2c=0x01;RMI2cSpeed=100"
  #     # When (if!) I get another nvidia GPU, check for resizeable bar
  #     # settings
  #     # Preserve memory after suspending
  #     "NVreg_PreserveVideoMemoryAllocations=1"
  #   ]
  # }
}
