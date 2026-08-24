# IPU7/ov08x40 MIPI webcam (Dell XPS 16, Panther Lake).
#
# The intel_ipu7/ov08x40 kernel drivers are already upstream, but the
# sensor's ACPI power-sequencing chain never completes without the
# out-of-tree intel_cvs driver (see github.com/intel/vision-drivers,
# tracked upstream at github.com/intel/vision-drivers/issues/36), so its
# v4l2-subdev never links into the IPU7 media graph. Hardware ISP (PSYS)
# additionally has permanent runtime-PM deferral issues on this platform,
# so this uses libcamera's software-ISP "simple" pipeline instead, relayed
# through v4l2loopback so browsers see a normal /dev/video device.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  boot.extraModulePackages = [
    (pkgs.callPackage ./packages/intel-cvs.nix {
      kernel = config.boot.kernelPackages.kernel;
      kernelModuleMakeFlags = config.boot.kernelPackages.kernelModuleMakeFlags;
    })
  ];

  boot.blacklistedKernelModules = [ "intel_ipu7_psys" ];

  # intel_ipu7 has no built-in knowledge of intel_cvs (it's out-of-tree), so
  # its sensor probe races ahead and finds nothing unless we force this order.
  boot.extraModprobeConfig = ''
    softdep intel_ipu7 pre: usbio gpio_usbio i2c_usbio intel_cvs intel_skl_int3472_discrete
  '';

  # Restrict the 32 raw IPU7 ISYS/CSI2 nodes to root; only the relayed
  # v4l2loopback device below should be reachable by normal users/apps.
  services.udev.extraRules = ''
    SUBSYSTEM=="media", DRIVERS=="intel-ipu7", MODE="0600", GROUP="root", TAG-="uaccess"
    SUBSYSTEM=="video4linux", DRIVERS=="intel-ipu7", MODE="0600", GROUP="root", TAG-="uaccess"
  '';

  # Hide the raw nodes from PipeWire/WirePlumber too, matched via the
  # ID_V4L_PRODUCT udev property the kernel sets on them (verified: "ipu7").
  services.pipewire.wireplumber.extraConfig."ipu7-v4l2-rules" = {
    "monitor.v4l2.rules" = [
      {
        matches = [ { "device.product.name" = "ipu7"; } ];
        actions."update-props"."device.disabled" = true;
      }
    ];
  };

  # libcamera's software-ISP "simple" pipeline handler has no tuning for
  # ov08x40, so it negotiates the sensor's native full-frame readout in
  # BGRA (not a YUV format, and not the requested size) rather than
  # anything requested via caps. videoscale then brings that down to a
  # saner call resolution before it hits the loopback device.
  services.v4l2-relayd.instances.ipu7 = {
    enable = true;
    cardLabel = "Intel MIPI Camera";
    extraPackages = [ pkgs.libcamera ];
    input = {
      pipeline = "libcamerasrc";
      format = "BGRA";
      width = 3848;
      height = 2176;
      framerate = 30;
    };
    output.format = "YUY2";
  };

  # The sensor is mounted rotated 180 degrees on the board and libcamera's
  # software pipeline doesn't apply that correction itself, so flip here.
  systemd.services.v4l2-relayd-ipu7.script = lib.mkForce ''
    exec ${pkgs.v4l2-relayd}/bin/v4l2-relayd \
      -i "libcamerasrc" \
      -o "appsrc name=appsrc caps=video/x-raw,format=BGRA,width=3848,height=2176,framerate=30/1 ! videoconvert ! videoflip method=rotate-180 ! videoscale ! video/x-raw,format=YUY2,width=1280,height=720,framerate=30/1 ! queue ! v4l2sink name=v4l2sink device=$(cat $V4L2_DEVICE_FILE)"
  '';
}
