# linux-wallpaperengine - Run Wallpaper Engine wallpapers on Linux via a systemd user service.
# Supports both Hyprland and Niri. Requires the Wallpaper Engine Steam assets directory.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.services.wallpaper.linux-wallpaperengine;

  launcherScript = pkgs.writeShellScript "launch-wallpaperengine" ''
    # Kill any existing instance so we don't stack on restart
    pkill -f linux-wallpaperengine || true
    sleep 0.5

    # If an assets dir is configured, check it's actually there before proceeding.
    # Exit 0 (clean) so systemd doesn't loop-restart when the drive isn't mounted.
    ${lib.optionalString (cfg.assetsDir != "") ''
      if [ ! -d "${cfg.assetsDir}" ]; then
        echo "linux-wallpaperengine: assets dir not found: ${cfg.assetsDir}" >&2
        echo "Is the Games drive mounted? Service will not restart until manually triggered." >&2
        exit 0
      fi
    ''}

    # Detect running compositor and enumerate active monitor names
    screen_args=()
    if [ -n "''${NIRI_SOCKET:-}" ]; then
      while IFS= read -r name; do
        screen_args+=(--screen-root "$name")
      done < <(niri msg outputs --json | ${pkgs.jq}/bin/jq -r '.[].name')
    elif [ -n "''${HYPRLAND_INSTANCE_SIGNATURE:-}" ]; then
      while IFS= read -r name; do
        screen_args+=(--screen-root "$name")
      done < <(hyprctl monitors -j | ${pkgs.jq}/bin/jq -r '.[].name')
    else
      echo "linux-wallpaperengine: no supported Wayland compositor detected" >&2
      exit 1
    fi

    exec ${pkgs.linux-wallpaperengine}/bin/linux-wallpaperengine \
      "''${screen_args[@]}" \
      ${lib.optionalString (cfg.assetsDir != "") ''--assets-dir "${cfg.assetsDir}"''} \
      ${lib.optionalString cfg.silent "--silent"} \
      ${lib.optionalString (!cfg.silent) "--volume ${toString cfg.volume}"} \
      ${lib.optionalString cfg.noFullscreenPause "--no-fullscreen-pause"} \
      --fps "${toString cfg.fps}" \
      ${lib.optionalString (cfg.playlist != null) ''--playlist "${toString cfg.playlist}"''} \
      ${lib.optionalString (cfg.backgroundId != null && cfg.playlist == null) ''"${cfg.backgroundId}"''}
  '';
in
{
  options.noodles.services.wallpaper.linux-wallpaperengine = {
    enable = lib.mkEnableOption "Wallpaper Engine for Linux";

    assetsDir = lib.mkOption {
      type = lib.types.str;
      default = "";
      description = "Path to the Wallpaper Engine assets dir (steamapps/common/wallpaper_engine/assets).";
      example = "/run/media/user/Games/SteamLibrary/steamapps/common/wallpaper_engine/assets";
    };

    fps = lib.mkOption {
      type = lib.types.int;
      default = 30;
      description = "Maximum FPS for wallpaper rendering.";
    };

    silent = lib.mkOption {
      type = lib.types.bool;
      default = true;
      description = "Mute wallpaper audio.";
    };

    volume = lib.mkOption {
      type = lib.types.int;
      default = 15;
      description = "Wallpaper audio volume (0-100). Ignored when silent = true.";
    };

    noFullscreenPause = lib.mkOption {
      type = lib.types.bool;
      default = false;
      description = "Prevent the wallpaper from pausing when a fullscreen app is active.";
    };

    playlist = lib.mkOption {
      type = lib.types.nullOr lib.types.int;
      default = null;
      description = "Wallpaper Engine playlist ID from config.json. Takes priority over backgroundId.";
    };

    backgroundId = lib.mkOption {
      type = lib.types.nullOr lib.types.str;
      default = null;
      description = "Default workshop background ID (e.g. \"2317494988\"). Used when playlist is null.";
    };
  };

  config = lib.mkIf cfg.enable {
    home-manager.users.${config.noodles.user} = {
      systemd.user.services.linux-wallpaperengine = {
        Unit = {
          Description = "Wallpaper Engine for Linux";
          After = [ "graphical-session.target" ];
          PartOf = [ "graphical-session.target" ];
        };

        Service = {
          ExecStart = "${launcherScript}";
          # Only restart on unexpected crashes (exit != 0).
          # A clean exit (0) means the drive wasn't mounted — don't loop.
          Restart = "on-failure";
          RestartSec = "10s";
        };

        Install = {
          WantedBy = [ "graphical-session.target" ];
        };
      };
    };
  };
}
