{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./floorp
    ./vivaldi
  ];
}
