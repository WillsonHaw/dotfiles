# waynergy - Synergy-protocol Wayland client for keyboard/mouse sharing.
{
  config,
  lib,
  pkgs,
  ...
}:
let
  hostName = config.networking.hostName;
in
{
  options = {
    noodles.apps.waynergy.enable = lib.mkEnableOption "Enable waynergy KVM client.";
  };

  config = lib.mkIf config.noodles.apps.waynergy.enable {
    environment.systemPackages = [
      # Patched: reduce UINPUT_KEY_MAX from 256 to 247 to exclude BTN_0
      # (evdev 256) from the uinput keyboard device's key bit field.
      # Without this, libinput misclassifies the device as having pointer
      # capability, dropping all keyboard events and breaking compositor
      # shortcuts (Super+key bindings in Niri).
      (pkgs.waynergy.overrideAttrs (old: {
        postPatch = (old.postPatch or "") + ''
          substituteInPlace src/wl_input_uinput.c \
            --replace-fail '#define UINPUT_KEY_MAX 256' '#define UINPUT_KEY_MAX 247'
        '';
      }))
    ];

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.file."${config.xdg.configHome}/xkb/keycodes/win".source = lib.mkForce ./keycodes;

        home.file."${config.xdg.configHome}/waynergy/xkb_keymap".text = lib.mkForce ''
          xkb_keymap {
            xkb_keycodes  { include "win+aliases(qwerty)" };
            xkb_types     { include "complete"            };
            xkb_compat    { include "complete"            };
            xkb_symbols   { include "pc+us+inet(evdev)"   };
            xkb_geometry  { include "pc(pc105)"           };
          };
        '';

        home.file."${config.xdg.configHome}/waynergy/config.ini".text = lib.mkForce ''
          host=10.0.0.123
          port=24800
          name=${hostName}
          xkb_key_offset=8
          backend=uinput

          [tls]
          enable=false

          [raw-keymap]
          ; Extended Windows scan codes that don't equal Linux evdev + 8
          ; Values here are XKB keycodes (evdev + 8). offset_on_explicit=0 prevents
          ; double-offsetting these explicit entries.
          offset_on_explicit=0
          347=133
          508=134
          312=108
          285=105
          349=135
          327=110
          328=111
          329=112
          331=113
          333=114
          335=115
          336=116
          337=117
          338=118
          339=119
          311=107
          284=104
          309=106
        '';
      };
  };
}
