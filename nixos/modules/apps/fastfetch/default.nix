{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy =
    { config, ... }:
    {
      home.file."${config.xdg.configHome}/fastfetch".source = ./.config;

      programs.fastfetch.enable = true;
    };
}
