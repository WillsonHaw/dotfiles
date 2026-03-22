{
  config,
  lib,
  pkgs,
  ...
}:

{
  config = lib.mkIf (config.noodles.desktops.environment == "kde") {
    environment.systemPackages = [ pkgs.libsForQt5.qt5ct ];

    environment.plasma6.excludePackages = with pkgs.kdePackages; [
      konsole
      oxygen
    ];

    # Wayland
    # services = {
    #   displayManager = {
    #     sddm = {
    #       enable = true;
    #       wayland.enable = true;
    #     };
    #   };

    #   desktopManager.plasma6.enable = true;
    # };

    # X11
    services = {
      # xserver.enable = true;

      displayManager.sddm.enable = true;
      xserver.desktopManager.plasma5.enable = true;
    };
    services.xserver = {
      enable = true;
      excludePackages = [ pkgs.xterm ];
    };
  };
}
