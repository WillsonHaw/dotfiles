{
  config,
  lib,
  ...
}:

{
  options.noodles.development.adb.enable =
    lib.mkEnableOption "ADB with udev rules and adbusers group";

  config = lib.mkIf config.noodles.development.adb.enable {
    # android-udev-rules was removed from nixpkgs: systemd now tags ADB/fastboot
    # USB devices with uaccess and grants the active local session access automatically.
    users.groups.adbusers = { };

    users.users.${config.noodles.user}.extraGroups = [ "adbusers" ];

    home-manager.users.${config.noodles.user}.programs.zsh.shellAliases = {
      # Run on this machine when the phone is plugged in here via USB but the
      # dev build (e.g. `pnpm expo run:android --device`) runs on a remote server
      # that can't reach the phone directly:
      #   1. On the remote server: adb kill-server        (frees port 5037 for the tunnel)
      #   2. Here:                 adb-tunnel <remote_ip> (leave running for the dev session)
      #   3. On the remote server: adb devices -l         (phone should now show up)
      #   4. On the remote server: niuhi-device-prepare && pnpm expo run:android --device
      adb-tunnel = "ssh -N -o ExitOnForwardFailure=yes -R 5037:localhost:5037 -L 8081:localhost:8081 -L 8097:localhost:8097";
    };
  };
}
