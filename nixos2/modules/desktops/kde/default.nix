{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.kde.enable = lib.mkEnableOption "Enable kde desktop.";
  };

  config = lib.mkIf config.noodles.desktops.kde.enable {
    environment.systemPackages = [
      pkgs.libsForQt5.qt5ct
      pkgs.libsForQt5.polonium
    ];

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

      desktopManager.plasma6.enable = true;
    };
  };
}
