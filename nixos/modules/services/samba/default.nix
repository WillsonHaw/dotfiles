# Samba - SMB/CIFS file sharing. Per-machine opt-in.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.services.samba;
  user = config.noodles.user;

  yesNo = b: if b then "yes" else "no";

  shareToSettings =
    _: share:
    {
      path = toString share.path;
      browseable = yesNo share.browseable;
      "read only" = yesNo share.readOnly;
      "guest ok" = yesNo share.guestOk;
      "force user" = share.forceUser;
    }
    // lib.optionalAttrs (share.comment != "") {
      comment = share.comment;
    }
    // lib.optionalAttrs (share.validUsers != [ ]) {
      "valid users" = lib.concatStringsSep " " share.validUsers;
    }
    // share.extraSettings;
in
{
  options.noodles.services.samba = {
    enable = lib.mkEnableOption "Enable Samba file sharing.";

    openFirewall = lib.mkEnableOption "Open Samba ports in the firewall.";

    wsdd.enable = lib.mkEnableOption "Advertise shares to Windows hosts via WS-Discovery.";

    usershares.enable = lib.mkEnableOption ''
      Allow members of the samba group to publish ad-hoc shares from their
      file manager (e.g. Dolphin right-click → Share).
    '';

    shares = lib.mkOption {
      type = lib.types.attrsOf (
        lib.types.submodule {
          options = {
            path = lib.mkOption {
              type = lib.types.path;
              description = "Local directory to expose over SMB.";
            };

            readOnly = lib.mkOption {
              type = lib.types.bool;
              default = false;
              description = "Whether clients can only read from this share.";
            };

            guestOk = lib.mkOption {
              type = lib.types.bool;
              default = false;
              description = "Allow unauthenticated guest access.";
            };

            browseable = lib.mkOption {
              type = lib.types.bool;
              default = true;
              description = "Whether the share appears in network browse lists.";
            };

            comment = lib.mkOption {
              type = lib.types.str;
              default = "";
              description = "Human-readable description shown to clients.";
            };

            validUsers = lib.mkOption {
              type = lib.types.listOf lib.types.str;
              default = [ ];
              description = ''
                Samba users allowed to connect. When empty and guestOk is
                false, defaults to the primary noodles user.
              '';
            };

            forceUser = lib.mkOption {
              type = lib.types.str;
              default = user;
              description = "Unix user Samba uses for file operations on this share.";
            };

            extraSettings = lib.mkOption {
              type = lib.types.attrs;
              default = { };
              description = ''
                Additional smb.conf keys for this share (e.g. Time Machine
                fruit/vfs options). Merged on top of the generated settings.
              '';
            };
          };
        }
      );
      default = { };
      example = {
        media = {
          path = "/home/slumpy/media";
          comment = "Shared media library";
        };
        public = {
          path = "/srv/public";
          guestOk = true;
          readOnly = true;
        };
      };
      description = ''
        Declarative Samba shares keyed by share name (the SMB path segment).
        Clients connect to //hostname/<name>.
      '';
    };
  };

  config = lib.mkIf cfg.enable {
    assertions = [
      {
        assertion = cfg.shares != { } || cfg.usershares.enable;
        message = ''
          noodles.services.samba: define at least one entry in
          noodles.services.samba.shares or set usershares.enable = true.
        '';
      }
    ];

    users.users.${user}.extraGroups = [ "samba" ];

    environment.systemPackages = with pkgs; [
      samba
      cifs-utils
    ];

    services.samba = {
      enable = true;
      package = pkgs.samba4Full;
      openFirewall = cfg.openFirewall;
      usershares.enable = cfg.usershares.enable;

      settings = {
        global = {
          workgroup = "WORKGROUP";
          "map to guest" = "Bad User";
        };
      }
      // lib.mapAttrs (
        name: share:
        shareToSettings name (
          share
          // {
            validUsers =
              if share.validUsers != [ ] then share.validUsers else lib.optionals (!share.guestOk) [ user ];
          }
        )
      ) cfg.shares;
    };

    services.samba-wsdd = lib.mkIf cfg.wsdd.enable {
      enable = true;
      openFirewall = cfg.openFirewall;
    };

    system.activationScripts.samba-password-sync = {
      deps = [
        "users"
        "groups"
      ];
      text = ''
        if [ -f "${config.sops.secrets.host_pw.path}" ]; then
          PASSWORD=$(cat "${config.sops.secrets.host_pw.path}")
          # Quietly inject the password into the smbpasswd database
          echo -e "$PASSWORD\n$PASSWORD" | ${pkgs.samba}/bin/smbpasswd -s -a ${config.noodles.user}
        fi
      '';
    };
  };
}
