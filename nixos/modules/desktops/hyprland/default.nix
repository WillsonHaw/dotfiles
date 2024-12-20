{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.desktops.hyprland.enable = lib.mkEnableOption "Enable hyprland desktop.";
    noodles.desktops.hyprland.card = lib.mkOption {
      description = "Path to PCI device that Hyprland should use.";
      default = "";
      type = lib.types.str;
    };
  };

  imports = [
    inputs.catppuccin.nixosModules.catppuccin
  ];

  config =
    let
      rootConfig = config;
    in
    lib.mkIf config.noodles.desktops.hyprland.enable {
      noodles.desktops.module = {
        ags.enable = true;
        eww.enable = true;
        mako.enable = true;
        rofi.enable = true;
        thunar.enable = true;
        # waybar.enable = true;
        wlogout.enable = true;
      };

      home-manager.users.slumpy =
        {
          config,
          hyprland-plugins,
          hy3,
          ...
        }:
        {
          imports = [ inputs.catppuccin.homeManagerModules.catppuccin ];

          home.file."${config.xdg.configHome}/hypr/hyprland".source = ./.config/hyprland;
          home.file."${config.xdg.configHome}/hypr/hyprlock".source = ./.config/hyprlock;

          home.file."${config.xdg.configHome}/hypr/hyprlock.conf".source = ./.config/hyprlock.conf;

          services.kdeconnect.enable = true;

          gtk = {
            enable = true;
          };

          catppuccin = {
            enable = true;
            flavor = "mocha";
            accent = "mauve";

            gtk = {
              flavor = "mocha";
              accent = "mauve";
              icon.enable = true;
            };

            cursors.enable = true;
            kvantum.enable = true;
            mako.enable = true;
            hyprland.enable = true;
          };

          wayland.windowManager.hyprland = {
            enable = true;

            package = inputs.hyprland.packages.${pkgs.system}.hyprland;

            plugins = [
              hyprland-plugins.packages.${pkgs.system}.hyprbars
              hyprland-plugins.packages.${pkgs.system}.hyprexpo
              hy3.packages.${pkgs.system}.hy3
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
            rootConfig.noodles.desktops.hyprland.card != null
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.desktops.hyprland.card; };
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
