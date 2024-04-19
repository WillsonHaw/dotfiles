{
  config,
  lib,
  pkgs,
  ...
}:

{
  # Enable the X11 windowing system.
  services = {
    displayManager = {
      sddm = {
        enable = true;
        wayland.enable = true;
      };

      # defaultSession = "plasma";
    };

    # xserver = {
    #   enable = true;
    #   excludePackages = [ pkgs.xterm ];
    # };

    # desktopManager.plasma6.enable = true;
  };
}
