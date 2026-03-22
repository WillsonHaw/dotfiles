# Godot - Open-source 2D and 3D game engine with its own scripting language.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.godot.enable = lib.mkEnableOption "Enable Godot.";
  };

  config = lib.mkIf config.noodles.apps.godot.enable {
    environment.systemPackages = with pkgs; [ godot_4 ];
  };
}
