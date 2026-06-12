# wlogout - Wayland logout menu with customizable layout and styling.
# Catppuccin's home-manager module owns the CSS (colours + SVG icons).
# We only provide the layout (button actions/labels/keybinds).
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.wlogout.enable = lib.mkEnableOption "Enable wlogout.";
  };

  config = lib.mkIf config.noodles.desktops.components.wlogout.enable {
    home-manager.users.${config.noodles.user} = {
      programs.wlogout = {
        enable = true;

        layout = [
          {
            label   = "lock";
            action  = "hyprlock";
            text    = "Lock";
            keybind = "l";
          }
          {
            label   = "suspend";
            action  = "systemctl suspend";
            text    = "Suspend";
            keybind = "u";
          }
          {
            label   = "logout";
            action  = "bash -c 'export PATH=/run/current-system/sw/bin:$PATH; case \"$XDG_CURRENT_DESKTOP\" in niri) niri msg action quit ;; Hyprland) hyprctl dispatch exit 0 ;; *) loginctl terminate-session \"$XDG_SESSION_ID\" ;; esac'";
            text    = "Logout";
            keybind = "e";
          }
          {
            label   = "reboot";
            action  = "systemctl reboot";
            text    = "Reboot";
            keybind = "r";
          }
          {
            label   = "shutdown";
            action  = "systemctl poweroff";
            text    = "Shutdown";
            keybind = "s";
          }
        ];
      };
    };
  };
}
