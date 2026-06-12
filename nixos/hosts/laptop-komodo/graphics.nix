# Graphics for the Dell XPS 16 (DA16260).
#
# The XPS 16 ships with a hybrid Intel iGPU + NVIDIA RTX dGPU. Prime offload
# is the right default. After installing on real hardware, run
# `lspci | grep -E 'VGA|3D'` and update the bus IDs below.
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
      # TODO: Replace with the real PCI bus IDs from `lspci`.
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
