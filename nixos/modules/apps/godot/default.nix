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
