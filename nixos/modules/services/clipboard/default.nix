# Clipboard - Wayland clipboard tools including wl-clipboard and the clipse clipboard manager.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = with pkgs; [
    wl-clipboard
    clipse
  ];
}
