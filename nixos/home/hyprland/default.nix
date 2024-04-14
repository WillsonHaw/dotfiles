{ config, lib, pkgs, ... }:

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
  # home.file = files;
  xdg.configFile."./hypr/start.sh".source = ./.config/start.sh;

  wayland.windowManager.hyprland = {
    enable = true;

    extraConfig = ''
      exec-once = ~/.config/hypr/start.sh
    '';
  };
}
