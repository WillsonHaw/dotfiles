{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./carla
    # ./guitarix
    ./qjackctl
  ];
}
