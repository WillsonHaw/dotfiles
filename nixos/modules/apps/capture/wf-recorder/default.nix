# wf-recorder - Screen recorder for wlroots-based Wayland compositors.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  screenRecord = pkgs.writeShellApplication {
    name = "screen-record";
    runtimeInputs = with pkgs; [
      wf-recorder
      slurp
      libnotify
      procps
    ];
    text = ''
      if pgrep -x wf-recorder >/dev/null; then
        pkill -INT -x wf-recorder
        exit 0
      fi

      dir="$HOME/Videos/Recordings"
      mkdir -p "$dir"
      file="$dir/Recording from $(date '+%Y-%m-%d %H-%M-%S').mp4"

      geometry=$(slurp -o) || exit 0

      notify-send -a "Screen Recorder" "Recording started" "Press Super+Shift+Print to stop"

      if wf-recorder -g "$geometry" -f "$file"; then
        notify-send -a "Screen Recorder" "Recording saved" "$file"
      else
        notify-send -u critical -a "Screen Recorder" "Recording failed"
      fi
    '';
  };
in
{
  options = {
    noodles.apps.capture.wf-recorder.enable = lib.mkEnableOption "Enable wf-recorder.";
  };

  config = lib.mkIf config.noodles.apps.capture.wf-recorder.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = with pkgs; [
        wf-recorder
        slurp
        screenRecord
      ];
    };
  };
}
