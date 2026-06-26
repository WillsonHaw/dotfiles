{
  config,
  lib,
  ...
}:

{
  options.noodles.development.adb.enable = lib.mkEnableOption "ADB with udev rules and adbusers group";

  config = lib.mkIf config.noodles.development.adb.enable {
    users.groups.adbusers = { };

    users.users.${config.noodles.user}.extraGroups = [ "adbusers" ];
  };
}
