# waynergy - Synergy-protocol Wayland client for keyboard/mouse sharing.
{
  config,
  lib,
  pkgs,
  ...
}:

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
  };
}
