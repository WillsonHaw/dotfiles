{
  config,
  lib,
  pkgs,
  ...
}:

{
  config = lib.mkIf config.noodles.services.power.enable {
    services.power-profiles-daemon.enable = false;

    services.auto-cpufreq = {
      enable = true;
      settings = {
        battery = {
          governor = "powersave";
          turbo = "never";
        };
        charger = {
          governor = "performance";
          turbo = "auto";
        };
      };
    };
  };
}
