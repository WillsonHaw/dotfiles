{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.hyprland = {
    # Install the packages from nixpkgs
    enable = true;
    # Whether to enable XWayland
    xwayland.enable = true;
  };

  environment = {
    systemPackages = with pkgs; [
      hyprlock
      hypridle
    ];

    sessionVariables = {
      # Required to run the correct GBM backend for nvidia GPUs on wayland
      GBM_BACKEND = "nvidia-drm";
      HYPRLAND_LOG_WLR = "1";
      # Apparently, without this nouveau may attempt to be used instead
      # (despite it being blacklisted)
      __GLX_VENDOR_LIBRARY_NAME = "nvidia";
      # Hardware cursors are currently broken on nvidia
      LIBVA_DRIVER_NAME = "nvidia";
      _JAVA_AWT_WM_NOREPARENTING = "1";
      XDG_SESSION_TYPE = "wayland";
      XDG_CURRENT_DESKTOP = "Hyprland";
      XDG_SESSION_DESKTOP = "Hyprland";
      WLR_NO_HARDWARE_CURSORS = "1";
      WLR_DRM_NO_MODIFIERS = "1";
      NIXOS_OZONE_WL = "1";
      __GL_THREADED_OPTIMIZATION = "1";
      __GL_SHADER_CACHE = "1";
    };
  };

  # Security
  security = {
    pam.services.swaylock = {
      text = ''
        auth include login
      '';
    };
  };

  xdg = {
    autostart.enable = true;
    portal = {
      enable = true;
      extraPortals = [
        pkgs.xdg-desktop-portal
        pkgs.xdg-desktop-portal-gtk
      ];
    };
  };
}
