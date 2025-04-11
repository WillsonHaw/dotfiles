{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./brave
    ./edge
    ./floorp
    # ./thorium
    ./vivaldi
    ./zen
  ];
}
