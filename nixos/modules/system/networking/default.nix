# Networking - NetworkManager configuration with GUI applet support.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.${config.noodles.user} = {
    home.packages = with pkgs; [ networkmanagerapplet ];
  };

  # Pick only one of the below networking options.
  # networking.wireless.enable = true; # Enables wireless support via wpa_supplicant.
  networking.networkmanager.enable = true; # Easiest to use and most distros use this by default.

  # Turn wifi off while a wired ethernet connection is up, and back on once
  # no ethernet device is connected.
  networking.networkmanager.dispatcherScripts = [
    {
      type = "basic";
      source = pkgs.writeShellScript "wifi-ethernet-toggle" ''
        interface="$1"
        action="$2"
        nmcli="${pkgs.networkmanager}/bin/nmcli"

        # USB/dock ethernet adapters can vanish from `nmcli device` entirely
        # by the time the "down" hook runs, so classify the departing
        # interface by name instead of looking it up there.
        is_ethernet_iface() {
          case "$1" in
            en*|eth*) return 0 ;;
            *) return 1 ;;
          esac
        }

        if [ "$action" = "up" ] && is_ethernet_iface "$interface"; then
          "$nmcli" radio wifi off
        elif [ "$action" = "down" ] && is_ethernet_iface "$interface"; then
          if ! "$nmcli" -t -f TYPE,STATE device | grep -qx "ethernet:connected"; then
            "$nmcli" radio wifi on
          fi
        fi
      '';
    }
  ];

  networking.extraHosts = ''
    127.0.0.1       localniuhi.dev
    127.0.0.1       api.localniuhi.dev
    127.0.0.1       kmc.localniuhi.dev
    127.0.0.1       mobile.localniuhi.dev
    127.0.0.1       partner.localniuhi.dev
  '';

  networking.firewall.allowedTCPPortRanges = [
    # KDE Connect
    {
      from = 1714;
      to = 1764;
    }
  ];
  networking.firewall.allowedUDPPortRanges = [
    # KDE Connect
    {
      from = 1714;
      to = 1764;
    }
  ];
  # Configure network proxy if necessary
  # networking.proxy.default = "http://user:password@proxy:port/";
  # networking.proxy.noProxy = "127.0.0.1,localhost,internal.domain";
}
