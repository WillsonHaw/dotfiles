{
  config,
  lib,
  pkgs,
  ...
}:

{
  home.file."${config.xdg.configHome}/anyrun".source = ./.config;
}
