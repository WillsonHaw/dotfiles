{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./kitty
    ./zsh
  ];
}
