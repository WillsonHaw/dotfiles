{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./swww.nix
    ./variety.nix
  ];
}
