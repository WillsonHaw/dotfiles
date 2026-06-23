# waynergy - Synergy-protocol Wayland client for keyboard/mouse sharing.
{
  config,
  lib,
  pkgs,
  ...
}:
let
  hostName = config.networking.hostName;
  waynergy-patched = pkgs.waynergy.overrideAttrs (old: {
    # Reduce UINPUT_KEY_MAX from 256 to 247 to exclude BTN_0 (evdev 256) from
    # the uinput keyboard device's key bit field.  Without this, libinput
    # misclassifies the device as having pointer capability, dropping all
    # keyboard events and breaking compositor shortcuts (Super+key in Niri).
    postPatch = (old.postPatch or "") + ''
      substituteInPlace src/wl_input_uinput.c \
        --replace-fail '#define UINPUT_KEY_MAX 256' '#define UINPUT_KEY_MAX 247'
    '';
  });
in
{
  options = {
    noodles.apps.waynergy.enable = lib.mkEnableOption "Enable waynergy KVM client.";
  };

  config = lib.mkIf config.noodles.apps.waynergy.enable {
    environment.systemPackages = [ waynergy-patched ];

    # Tell kanshi to restart waynergy on every profile change so it re-queries
    # the active outputs and reports the correct screen dimensions to the
    # Synergy server.  Only wired up when the display module is also enabled.
    noodles.system.display.profileChangeExec = lib.mkIf config.noodles.system.display.enable [
      "systemctl --user restart waynergy.service"
    ];

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        # Managed as a systemd user service so kanshi can restart it on display
        # profile changes (which alter the bounding box waynergy reports to the
        # Synergy server).
        systemd.user.services.waynergy = {
          Unit = {
            Description = "Waynergy Synergy protocol client";
            PartOf = [ "graphical-session.target" ];
            After = [ "graphical-session.target" ];
          };
          Service = {
            ExecStart = "${waynergy-patched}/bin/waynergy";
            Restart = "on-failure";
            RestartSec = "3";
          };
          Install.WantedBy = [ "graphical-session.target" ];
        };

        home.file."${config.xdg.configHome}/xkb/keycodes/win".source = lib.mkForce (
          config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/apps/waynergy/keycodes"
        );

        home.file."${config.xdg.configHome}/xkb/symbols/highfnkeys".text = ''
          default partial function_keys
          xkb_symbols "highfnkeys" {
            key <FK13> { [ F13 ] };
            key <FK14> { [ F14 ] };
            key <FK15> { [ F15 ] };
            key <FK16> { [ F16 ] };
            key <FK17> { [ F17 ] };
            key <FK18> { [ F18 ] };
            key <FK19> { [ F19 ] };
            key <FK20> { [ F20 ] };
            key <FK21> { [ F21 ] };
            key <FK22> { [ F22 ] };
            key <FK23> { [ F23 ] };
            key <FK24> { [ F24 ] };
          };
        '';

        home.file."${config.xdg.configHome}/xkb/rules/evdev".text = ''
          ! include %S/evdev
          ! model = symbols
            * = +highfnkeys(highfnkeys)
        '';

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
          ; F13-F24 use PS/2 scan codes 100-111 (0x64-0x6F). Adding offset 8 puts them
          ; in the navigation key range (e.g. F20=107+8=115=End), so map them explicitly.
          100=191
          101=192
          102=193
          103=194
          104=195
          105=196
          106=197
          107=198
          108=199
          109=200
          110=201
          111=202
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
