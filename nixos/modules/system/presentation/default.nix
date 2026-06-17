# Presentation - Display mode switcher (PC only / Duplicate / Extend / Second screen only).
# Mirrors the Windows Win+P workflow for Wayland compositors.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  # Script that shows a rofi picker and applies the chosen display mode.
  # Uses wlr-randr for output control (wlr-output-management-unstable-v1 protocol)
  # and wl-mirror for software screen duplication.
  presentation-mode = pkgs.writeShellScriptBin "presentation-mode" ''
    set -euo pipefail

    ROFI_CMD="${pkgs.rofi}/bin/rofi -dmenu -p 'Display mode' -theme-str 'window {width: 28em;}'"

    CHOICE=$(printf 'PC screen only\nDuplicate\nExtend\nSecond screen only' \
      | eval "$ROFI_CMD") || exit 0

    # Detect outputs: first is internal (eDP-*), rest are external.
    mapfile -t OUTPUTS < <(${pkgs.wlr-randr}/bin/wlr-randr --json \
      | ${pkgs.jq}/bin/jq -r '.[] | .name')

    INTERNAL=""
    EXTERNAL=""
    for out in "''${OUTPUTS[@]}"; do
      if [[ "$out" == eDP-* ]]; then
        INTERNAL="$out"
      elif [[ -z "$EXTERNAL" ]]; then
        EXTERNAL="$out"
      fi
    done

    # Kill any running wl-mirror instance before switching modes.
    pkill -x wl-mirror 2>/dev/null || true

    case "$CHOICE" in
      "PC screen only")
        [[ -n "$INTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$INTERNAL" --on
        [[ -n "$EXTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$EXTERNAL" --off
        ;;
      "Duplicate")
        # Bring both outputs on, then mirror with wl-mirror.
        [[ -n "$INTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$INTERNAL" --on
        [[ -n "$EXTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$EXTERNAL" --on
        if [[ -n "$INTERNAL" && -n "$EXTERNAL" ]]; then
          # wl-mirror renders the internal screen contents into a fullscreen window on the external output.
          ${pkgs.wl-mirror}/bin/wl-mirror --output "$EXTERNAL" "$INTERNAL" &
        fi
        ;;
      "Extend")
        if [[ -n "$INTERNAL" && -n "$EXTERNAL" ]]; then
          # Place external display to the right of the internal display.
          INT_WIDTH=$(${pkgs.wlr-randr}/bin/wlr-randr --json \
            | ${pkgs.jq}/bin/jq -r --arg n "$INTERNAL" '.[] | select(.name==$n) | .current_mode.width // 1920')
          ${pkgs.wlr-randr}/bin/wlr-randr \
            --output "$INTERNAL" --on --pos 0,0 \
            --output "$EXTERNAL" --on --pos "$INT_WIDTH",0
        else
          [[ -n "$INTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$INTERNAL" --on
          [[ -n "$EXTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$EXTERNAL" --on
        fi
        ;;
      "Second screen only")
        [[ -n "$INTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$INTERNAL" --off
        [[ -n "$EXTERNAL" ]] && ${pkgs.wlr-randr}/bin/wlr-randr --output "$EXTERNAL" --on
        ;;
    esac
  '';
in
{
  options.noodles.system.presentation.enable = lib.mkEnableOption "presentation mode switcher (Win+P equivalent)";

  config = lib.mkIf config.noodles.system.presentation.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = [
        presentation-mode
        pkgs.wl-mirror
        pkgs.wlr-randr
        pkgs.wdisplays
      ];
    };
  };
}
