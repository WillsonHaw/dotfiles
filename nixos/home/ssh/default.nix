{ config, lib, pkgs, ... }:

{
  home.file."${config.xdg.configHome}/.ssh/config".source = ./.config/config;
}
