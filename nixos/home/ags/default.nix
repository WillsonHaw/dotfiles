{
  config,
  lib,
  pkgs,
  ...
}:

{
  home.file."${config.xdg.configHome}/ags".source = ./.config;
}
