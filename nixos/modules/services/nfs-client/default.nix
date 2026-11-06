# NFS client - Mount every LAN host in networking.hosts at /mnt/<hostname>.
{
  config,
  lib,
  ...
}:

let
  cfg = config.noodles.services.nfs-client;

  isRemote =
    ip: names: !(lib.hasPrefix "127." ip) && ip != "::1" && !(lib.elem config.networking.hostName names);

  remoteHosts = lib.filterAttrs isRemote config.networking.hosts;

  mkMount = ip: names: {
    name = "/mnt/${lib.head names}";
    value = {
      device = "${ip}:${cfg.remotePath}";
      fsType = "nfs";
      options = [
        "noauto"
        "_netdev"
        "x-systemd.automount"
        "x-systemd.idle-timeout=600"
        "x-systemd.mount-timeout=15"
        "nfsvers=4.1"
        "soft"
        "timeo=15"
      ];
    };
  };
in
{
  options.noodles.services.nfs-client = {
    enable = lib.mkEnableOption "NFS automounts for every host in networking.hosts";

    remotePath = lib.mkOption {
      type = lib.types.str;
      default = "/home/${config.noodles.user}/repos";
      description = "Exported directory on each remote host to mount.";
    };
  };

  config = lib.mkIf cfg.enable {
    boot.supportedFilesystems = [ "nfs" ];

    fileSystems = lib.mapAttrs' mkMount remoteHosts;
  };
}
