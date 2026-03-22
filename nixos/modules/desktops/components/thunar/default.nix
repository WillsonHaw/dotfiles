# Thunar - Xfce's fast and lightweight file manager with plugin support.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.thunar.enable = lib.mkEnableOption "Enable Thunar.";
  };

  config = lib.mkIf config.noodles.desktops.components.thunar.enable {
    programs.thunar.enable = true;
    programs.thunar.plugins = with pkgs; [
      thunar-archive-plugin
      thunar-volman
    ];
  };
}
