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

    noodles.device.battery = lib.mkOption {
      description = "Battery device name as reported by /sys/class/power_supply (e.g. BAT0, BAT1).";
      default = "BAT1";
      type = lib.types.str;
    };

    noodles.device.battery-adapter = lib.mkOption {
      description = "AC adapter device name as reported by /sys/class/power_supply (e.g. AC, ADP1).";
      default = "ADP1";
      type = lib.types.str;
    };
  };

  imports = [
    ./apps
    ./desktops
    ./development
    ./services
    ./shell
    ./system
  ];
}
