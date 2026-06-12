# Placeholder hardware-configuration for the Dell XPS 16 (DA16260).
#
# After installing NixOS on the target machine, replace this file with the
# output of `nixos-generate-config --show-hardware-config`. The real file will
# contain filesystem UUIDs, swap devices, and kernel modules detected on the
# machine.
{
  config,
  lib,
  pkgs,
  modulesPath,
  ...
}:

{
  imports = [ (modulesPath + "/installer/scan/not-detected.nix") ];

  boot.initrd.availableKernelModules = [ ];
  boot.initrd.kernelModules = [ ];
  boot.kernelModules = [ "kvm-intel" ];
  boot.extraModulePackages = [ ];

  # TODO: Replace the device UUIDs below after running nixos-generate-config.
  # fileSystems."/" = {
  #   device = "/dev/disk/by-uuid/REPLACE-ME";
  #   fsType = "ext4";
  # };
  #
  # fileSystems."/boot" = {
  #   device = "/dev/disk/by-uuid/REPLACE-ME";
  #   fsType = "vfat";
  # };

  swapDevices = [ ];

  networking.useDHCP = lib.mkDefault true;

  nixpkgs.hostPlatform = lib.mkDefault "x86_64-linux";
  hardware.cpu.intel.updateMicrocode = lib.mkDefault config.hardware.enableRedistributableFirmware;
}
