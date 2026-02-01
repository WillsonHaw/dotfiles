{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.module.thunar.enable = lib.mkEnableOption "Enable Thunar.";
  };

  config = lib.mkIf config.noodles.desktops.module.thunar.enable {
    programs.thunar.enable = true;
    programs.thunar.plugins = with pkgs; [
      thunar-archive-plugin
      thunar-volman
    ];
  };
}
