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
      nvidiaBusId = "PCI:1:0:0";
    };

    package = config.boot.kernelPackages.nvidiaPackages.stable;
  };
}
