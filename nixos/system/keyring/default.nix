{ config, lib, pkgs, ... }:

{
  programs.seahorse.enable = true;
  services.gnome.gnome-keyring.enable = true;
}
