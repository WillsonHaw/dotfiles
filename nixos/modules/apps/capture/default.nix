{
  config,
  lib,
  pkgs,
  ...
}:

{
  imports = [
    ./flameshot
    ./grimblast
  ];
}
