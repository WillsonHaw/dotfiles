{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.user = lib.mkOption {
      type = lib.types.str;
      description = "Primary user account name.";
    };

    noodles.device.is-laptop = lib.mkEnableOption "Enable laptop settings.";

    noodles.device.gpu.card = lib.mkOption {
      description = "Path to the GPU PCI device.";
      default = "";
      type = lib.types.str;
    };
  };

  imports = [
    ./apps
    ./desktops
    ./services
    ./shell
    ./system
  ];
}
