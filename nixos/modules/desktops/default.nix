{ config, lib, ... }:

let
  dirs = lib.attrNames (
    lib.filterAttrs (_: type: type == "directory") (builtins.readDir ./.)
  );
in
{
  options.noodles.desktops.environment = lib.mkOption {
    type = lib.types.nullOr (
      lib.types.enum [
        "hyprland"
        "gnome"
        "kde"
        "sway"
        "niri"
        "cosmic"
      ]
    );
    default = null;
    description = "Desktop environment to enable. Only one may be active.";
  };

  imports = map (d: ./${d}) dirs;
}
