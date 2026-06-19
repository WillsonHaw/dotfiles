# Hyprland - Dynamic tiling Wayland compositor with smooth animations and Catppuccin theming.
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
    lib.mkIf (config.noodles.desktops.environment == "hyprland") {
      noodles.desktops.components = {
        greeter = "regreet";
        # ags.enable = true;
        hyprpanel.enable = true;
        # eww.enable = true;
        # mako.enable = true;
        rofi.enable = true;
        thunar.enable = true;
        # waybar.enable = true;
        wlogout.enable = true;
      };

      home-manager.users.${config.noodles.user} =
        {
          config,
          ...
        }:
        {
          imports = [ inputs.catppuccin.homeModules.catppuccin ];

          home.file."${config.xdg.configHome}/hypr/hyprland".source =
            config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/hyprland/.config/hyprland";
          home.file."${config.xdg.configHome}/hypr/hyprlock".source =
            config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/hyprland/.config/hyprlock";

          home.file."${config.xdg.configHome}/hypr/hyprlock.conf".source =
            config.lib.file.mkOutOfStoreSymlink "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/hyprland/.config/hyprlock.conf";

          services.kdeconnect.enable = true;

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
            # mako.enable = true;
            hyprland.enable = true;
          };

          wayland.windowManager.hyprland = {
            enable = true;

            package = inputs.hyprland.packages.${pkgs.stdenv.hostPlatform.system}.hyprland;

            plugins = [
              #              inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.hyprbars
              #              inputs.hyprland-plugins.packages.${pkgs.stdenv.hostPlatform.system}.hyprexpo
              inputs.hy3.packages.${pkgs.stdenv.hostPlatform.system}.hy3
            ];

            extraConfig = ''
              # Defaults
              source=~/.config/hypr/hyprland/theme-mocha.conf
              source=~/.config/hypr/hyprland/env.conf
              source=~/.config/hypr/hyprland/execs.conf
              source=~/.config/hypr/hyprland/general.conf
              source=~/.config/hypr/hyprland/rules.conf
              source=~/.config/hypr/hyprland/colors.conf
              source=~/.config/hypr/hyprland/keybinds.conf
            '';
          };

          # Use specified GPU for hyprland
          home.file."${config.xdg.configHome}/hypr/card" = lib.mkIf (
            rootConfig.noodles.device.gpu.card != ""
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.device.gpu.card; };
        };

      programs.hyprland = {
        # Install the packages from nixpkgs
        enable = true;
        # Whether to enable XWayland
        xwayland.enable = true;
      };

      environment = {
        sessionVariables = {
          NIXOS_OZONE_WL = "1";
          XDG_CURRENT_DESKTOP = "Hyprland";
        };

        systemPackages = with pkgs; [
          # hyprpicker
          hyprcursor
          hyprlock
          hypridle
          hyprshade
          nwg-look
        ];
      };

      xdg = {
        autostart.enable = true;
        portal = {
          enable = true;
          extraPortals = [ pkgs.xdg-desktop-portal-hyprland ];
        };
      };
    };
}
