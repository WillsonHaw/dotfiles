# Niri - Scrollable tiling Wayland compositor with Catppuccin theming.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    inputs.catppuccin.nixosModules.catppuccin
  ];

  config =
    let
      rootConfig = config;
    in
    lib.mkIf (config.noodles.desktops.environment == "niri") {
      noodles.desktops.components = {
        waybar.enable = true;
        rofi.enable = true;
        mako.enable = true;
        thunar.enable = true;
        wlogout.enable = true;
      };

      programs.niri.enable = true;

      security.pam.services.swaylock = { };

      environment = {
        sessionVariables = {
          NIXOS_OZONE_WL = "1";
          XDG_CURRENT_DESKTOP = "niri";
        };

        systemPackages = with pkgs; [
          xwayland-satellite
          swaylock
          swayidle
          swaybg
          nwg-look
        ];
      };

      xdg = {
        autostart.enable = true;
        portal = {
          enable = true;
          extraPortals = [ pkgs.xdg-desktop-portal-gnome ];
        };
      };

      home-manager.users.${config.noodles.user} =
        {
          config,
          ...
        }:
        {
          imports = [ inputs.catppuccin.homeModules.catppuccin ];

          gtk = {
            enable = true;
            gtk4.theme = null;
          };

          catppuccin = {
            enable = true;
            autoEnable = true;
            flavor = "mocha";
            accent = "mauve";

            cursors.enable = true;
            kvantum.enable = true;
          };

          programs.zsh.initContent = lib.mkOrder 500 ''
            # Auto-start niri on tty1
            if [ -z "$DISPLAY" ] && [ -z "$WAYLAND_DISPLAY" ] && [ "$(tty)" = "/dev/tty1" ]; then
              exec niri-session
            fi
          '';

          home.file."${config.xdg.configHome}/niri/config.kdl".source = ./config.kdl;

          # Use specified GPU for niri
          home.file."${config.xdg.configHome}/niri/card" = lib.mkIf (
            rootConfig.noodles.device.gpu.card != ""
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.device.gpu.card; };
        };
    };
}
