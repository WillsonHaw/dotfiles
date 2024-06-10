{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.device.is-laptop = lib.mkEnableOption "Enable laptop settings.";
  };

  imports = [
    ./apps
    ./desktops
    ./services
    ./shell
    ./system
  ];
}
