# dconf2nix - Converts dconf/GNOME settings dumps into Nix expressions.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = with pkgs; [ dconf2nix ];
}
