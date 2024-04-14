{ config, lib, pkgs, ... }:

{
  # Enable the X11 windowing system.
  services = {
    xserver = {
      enable = true;

      excludePackages = [
        pkgs.xterm
      ];

      displayManager.sddm.enable = true;
      displayManager.sddm.wayland.enable = true;
      displayManager.defaultSession = "plasma";
    };
  
    desktopManager.plasma6.enable = true;
  };
}
