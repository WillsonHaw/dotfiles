{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./floorp
    ./thorium
    ./vivaldi
    ./zen
  ];
}
