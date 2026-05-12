# NVIDIA - Proprietary NVIDIA GPU driver configuration with PRIME offload support.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.system.nvidia.enable = lib.mkEnableOption "Enable NVIDIA GPU support.";
  };

  config = lib.mkIf config.noodles.system.nvidia.enable {
    services.xserver.videoDrivers = [ "nvidia" ];

    hardware = {
      graphics = {
        enable32Bit = true;
        enable = true;
      };

      nvidia = {
        modesetting.enable = true;
        nvidiaPersistenced = false;
        nvidiaSettings = true;

        # Enables NVreg_PreserveVideoMemoryAllocations and
        # nvidia-suspend/resume/hibernate systemd services
        powerManagement.enable = lib.mkDefault true;
        powerManagement.finegrained = lib.mkDefault false;
        open = lib.mkDefault false;
      };
    };

    # Use S3 deep sleep instead of s2idle (which often fails with NVIDIA)
    boot.kernelParams = [ "mem_sleep_default=deep" ];
  };
}
