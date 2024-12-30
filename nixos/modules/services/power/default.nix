{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.power.tlp.enable = lib.mkEnableOption "Enable tlp power management (for laptops).";
    noodles.services.power.cpufreq.enable =
      lib.mkEnableOption "Enable cpufreq power management (for laptops).";
  };

  imports = [
    ./tlp
    ./cpufreq
  ];

  config.services.upower.enable = true;
}
