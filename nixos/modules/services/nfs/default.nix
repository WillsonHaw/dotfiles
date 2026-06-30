# NFS - Network File System server. Per-machine opt-in.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.services.nfs;

  shareToExport =
    _: share:
    let
      options = lib.concatStringsSep "," (
        [ (if share.readOnly then "ro" else "rw") ]
        ++ (if share.sync then [ "sync" ] else [ "async" ])
        ++ lib.optional share.noSubtreeCheck "no_subtree_check"
        ++ lib.optional share.noRootSquash "no_root_squash"
        ++ share.extraOptions
      );
      clientEntries = map (host: "${host}(${options})") share.hosts;
    in
    "${toString share.path}  ${lib.concatStringsSep " " clientEntries}";
in
{
  options.noodles.services.nfs = {
    enable = lib.mkEnableOption "NFS server";

    openFirewall = lib.mkEnableOption "Open NFS ports in the firewall";

    shares = lib.mkOption {
      type = lib.types.attrsOf (
        lib.types.submodule {
          options = {
            path = lib.mkOption {
              type = lib.types.path;
              description = "Local directory to export over NFS.";
            };

            hosts = lib.mkOption {
              type = lib.types.listOf lib.types.str;
              default = [ "*" ];
              description = "Host patterns allowed to mount this share (e.g. \"192.168.1.0/24\").";
            };

            readOnly = lib.mkOption {
              type = lib.types.bool;
              default = false;
              description = "Whether clients can only read from this share.";
            };

            sync = lib.mkOption {
              type = lib.types.bool;
              default = true;
              description = "Synchronous writes (safer). Set false for async.";
            };

            noSubtreeCheck = lib.mkOption {
              type = lib.types.bool;
              default = true;
              description = "Disable subtree checking (improves reliability when exporting subdirs).";
            };

            noRootSquash = lib.mkOption {
              type = lib.types.bool;
              default = false;
              description = "Allow root on the client to act as root on the server.";
            };

            extraOptions = lib.mkOption {
              type = lib.types.listOf lib.types.str;
              default = [ ];
              description = "Additional NFS export options appended to the options list.";
            };
          };
        }
      );
      default = { };
      example = {
        repos = {
          path = "/home/slumpy/repos";
          hosts = [ "192.168.1.0/24" ];
        };
        public = {
          path = "/srv/public";
          readOnly = true;
          hosts = [ "*" ];
        };
      };
      description = ''
        Declarative NFS exports keyed by a descriptive name.
        Generates /etc/exports entries; mount with: mount host:/path /mnt.
      '';
    };
  };

  config = lib.mkIf cfg.enable {
    assertions = [
      {
        assertion = cfg.shares != { };
        message = "noodles.services.nfs: define at least one entry in noodles.services.nfs.shares.";
      }
    ];

    environment.systemPackages = [ pkgs.nfs-utils ];

    services.nfs.server = {
      enable = true;
      # Fixed ports so the firewall rules below are stable across reboots.
      lockdPort = 4001;
      mountdPort = 4002;
      statdPort = 4000;
      exports = lib.concatStringsSep "\n" (lib.mapAttrsToList shareToExport cfg.shares);
    };

    networking.firewall = lib.mkIf cfg.openFirewall {
      allowedTCPPorts = [
        111  # rpcbind/portmapper
        2049 # nfsd
        4000 # statd
        4001 # lockd
        4002 # mountd
      ];
      allowedUDPPorts = [
        111
        2049
        4000
        4001
        4002
      ];
    };
  };
}
