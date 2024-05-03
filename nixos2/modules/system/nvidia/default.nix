{
  config,
  lib,
  pkgs,
  ...
}:

# let
#   cfg = config.hardware.nvidia.vaapi;
# in
{
  # Specify the Nvidia video driver for Xorg 
  services.xserver.videoDrivers = [ "nvidia" ];
  boot.initrd.kernelModules = [ "nvidia" ];
  boot.extraModulePackages = [ config.boot.kernelPackages.nvidia_x11 ];

  # Enable OpenGL
  hardware = {
    enableAllFirmware = true;

    opengl = {
      enable = true;
      driSupport = true;
      driSupport32Bit = true;

      #---------------------------------------------------------------------
      # Install additional packages that improve graphics performance and compatibility.
      #---------------------------------------------------------------------
      extraPackages = with pkgs; [
        #   intel-media-driver # LIBVA_DRIVER_NAME=iHD
        libvdpau-va-gl
        nvidia-vaapi-driver
        #   vaapiIntel # LIBVA_DRIVER_NAME=i965 (older but works better for Firefox/Chromium)
        vaapiVdpau
        vulkan-validation-layers
      ];
    };

    nvidia = {
      modesetting.enable = true;
      nvidiaPersistenced = true;
      nvidiaSettings = true;

      powerManagement.enable = true;
      #   powerManagement.finegrained = false;
      #   open = false;

      #   # vaapi = {
      #   #   enable = true;
      #   #   firefox.enable = true;
      #   # };
    };
  };

  # config = lib.mkIf config.noodles.system.nvidia.laptop.enable {
  #boot.extraModprobeConfig = ''
  #  options nvidia_drm  fbdev=1
  #  options nvidia ${
  #    lib.concatStringsSep " " [
  #      # nvidia assume that by default your CPU does not support PAT,
  #      # but this is effectively never the case in 2023
  #      "NVreg_UsePageAttributeTable=1"
  #      # This may be a noop, but it's somewhat uncertain
  #      "NVreg_EnablePCIeGen3=1"
  #      # This is sometimes needed for ddc/ci support, see
  #      # https://www.ddcutil.com/nvidia/
  #      #
  #      # Current monitor does not support it, but this is useful for
  #      # the future
  #      "NVreg_RegistryDwords=RMUseSwI2c=0x01;RMI2cSpeed=100"
  #      # When (if!) I get another nvidia GPU, check for resizeable bar
  #      # settings
  #      # Preserve memory after suspending
  #      "NVreg_PreserveVideoMemoryAllocations=1"
  #    ]
  #  }
  #'';

  environment = {
    # Set environment variables related to NVIDIA graphics
    variables = {
      # Required to run the correct GBM backend for nvidia GPUs on wayland
      GBM_BACKEND = "nvidia-drm";
      # Apparently, without this nouveau may attempt to be used instead
      # (despite it being blacklisted)
      __GLX_VENDOR_LIBRARY_NAME = "nvidia";
      # Hardware cursors are currently broken on nvidia
      LIBVA_DRIVER_NAME = "nvidia";
      WLR_NO_HARDWARE_CURSORS = "1";
      NIXOS_OZONE_WL = "1";
      __GL_THREADED_OPTIMIZATION = "1";
      __GL_SHADER_CACHE = "1";
    };

    # Packages related to NVIDIA graphics
    systemPackages = with pkgs; [
      clinfo
      gwe
      nvtopPackages.nvidia
      virtualglLib
      vulkan-loader
      vulkan-tools
    ];
  };

  # Replace a glFlush() with a glFinish() - this prevents stuttering
  # and glitching in all kinds of circumstances for the moment.
  #
  # Apparently I'm waiting for "explicit sync" support, which needs to
  # land as a wayland thing. I've seen this work reasonably with VRR
  # before, but emacs continued to stutter, so for now this is
  # staying.
  # nixpkgs.overlays = [
  #   (_: final: {
  #     wlroots_0_16 = final.wlroots_0_16.overrideAttrs (_: {
  #       patches = [ ./wlroots-nvidia.patch ];
  #     });
  #   })
  # ];

  #   # options.hardware.nvidia.vaapi = with lib.types; {
  #   #   enable = lib.mkEnableOption "vaapi";

  #   #   maxInstances = lib.mkOption {
  #   #     type = nullOr int;
  #   #     default = null;
  #   #     description = ''
  #   #       The maximum number of concurrent instances of the driver.

  #   #       Sometimes useful for graphics cards with little VRAM.
  #   #     '';
  #   #   };
  #   # };

  #   # # See https://github.com/elFarto/nvidia-vaapi-driver#configuration
  #   # config = lib.mkIf cfg.enable {
  #   #   environment.variables =
  #   #     {
  #   #       NVD_BACKEND = "direct";
  #   #     }
  #   #     // lib.optionalAttrs (cfg.maxInstances != null) { NVD_MAX_INSTANCES = toString cfg.maxInstances; }
  #   #     // lib.optionalAttrs cfg.firefox.enable { MOZ_DISABLE_RDD_SANDBOX = "1"; };

  #   #   # TODO(tlater): Find a way to properly integrate this so we can
  #   #   # upstream it.
  #   # };
  # };
}
