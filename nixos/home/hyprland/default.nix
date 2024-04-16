{
  config,
  lib,
  pkgs,
  ...
}:

# let
#   # Returns all files from specified path
#   getFiles = (dir:
#     builtins.attrNames(
#       builtins.listToAttrs(
#         builtins.filter (x: x.value == "regular") (
#           builtins.attrValues (
#             builtins.mapAttrs (k: v: { name = k; value = v; }) (
#               builtins.readDir dir
#             )
#           )
#         )
#       )
#     )
#   );

#   # Creates an attrset for `home.file`
#   toFile = (f: {
#     name = ".config/hypr/" + f;
#     value = {
#       enable = true;
#       source = ../../config/hypr + ("/" + f);
#     };
#   });

#   files = builtins.listToAttrs(
#     builtins.map (f: toFile(f)) (
#       getFiles ../../config/hypr
#     )
#   );
# in
{
  home.file."${config.xdg.configHome}/hypr/scripts" = {
    source = ./.config/scripts;
    executable = true;
  };

  home.file."${config.xdg.configHome}/hypr/keybind" = {
    source = ./.config/keybind;
    executable = true;
  };

  home.file."${config.xdg.configHome}/hypr/start.sh" = {
    source = ./.config/start.sh;
    executable = true;
  };

  home.file."${config.xdg.configHome}/hypr/xdg-portal-hyprland" = {
    source = ./.config/xdg-portal-hyprland;
    executable = true;
  };

  wayland.windowManager.hyprland = {
    enable = true;

    settings = {
      monitor = "eDP-1,2560x1440@59.96,0x0,1";

      "$mod" = "SUPER";

      bind = [
        "$mod, grave, exec, kitty"
        "$mod, o, exec, hyprctl reload" # Reload Hyprland
        "$mod, p, exec, killall -SIGUSR2 waybar" # Reload waybar
      ];
    };

    extraConfig = ''
      exec-once = ~/.config/hypr/start.sh
    '';
  };
}
