{
  config,
  lib,
  pkgs,
  ...
}:

{
  # Don't use blueman with kde, since it has it's own bluetooth management
  services.blueman.enable = !config.noodles.desktops.kde.enable;

  hardware.bluetooth = {
    enable = true; # enables support for Bluetooth
    powerOnBoot = true; # powers up the default Bluetooth controller on boot
    settings.General = {
      UserspaceHID = true;
      Enable = "Source,Sink,Media,Socket";
      AutoEnable = true;
      ControllerMode = "bredr";
    };
  };
}
