{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.desktops.hyprland_new.enable = lib.mkEnableOption "Enable hyprland desktop.";
    noodles.desktops.hyprland_new.card = lib.mkOption {
      description = "Path to PCI device that Hyprland should use.";
      default = "";
      type = lib.types.str;
    };
  };

  imports = [ inputs.catppuccin.nixosModules.catppuccin ];

  config =
    let
      rootConfig = config;
    in
    lib.mkIf config.noodles.desktops.hyprland_new.enable {
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

          catppuccin = {
            enable = true;
            flavor = "mocha";
          };

          gtk.catppuccin = {
            enable = true;
            cursor.enable = true;
            gnomeShellTheme = true;
            icon.enable = true;
          };

          qt.style.catppuccin.enable = true;
          services.mako.catppuccin.enable = true;
          wayland.windowManager.hyprland.catppuccin.enable = true;

          wayland.windowManager.hyprland = {
            enable = true;

            plugins = [
              # hyprland-plugins.packages.x86_64-linux.hyprexpo
              # hy3.packages.x86_64-linux.hy3
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
            # settings = {
            #   "$mod" = "SUPER";

            #   bind =
            #     [
            #       "$mod, Grave, exec, kitty"
            #       "$mod SHIFT, s, exec, flameshot gui"
            #     ]
            #     ++ (
            #       # workspaces
            #       # binds $mod + [shift +] {1..10} to [move to] workspace {1..10}
            #       builtins.concatLists (
            #         builtins.genList (
            #           x:
            #           let
            #             ws =
            #               let
            #                 c = (x + 1) / 10;
            #               in
            #               builtins.toString (x + 1 - (c * 10));
            #           in
            #           [
            #             "$mod, f${ws}, workspace, ${toString (x + 1)}"
            #             "$mod SHIFT, f${ws}, movetoworkspace, ${toString (x + 1)}"
            #           ]
            #         ) 10
            #       )
            #     );
            # };
          };

          # home.file."${config.xdg.configHome}/hypr/custom".source = ./.config/custom;
          # home.file."${config.xdg.configHome}/hypr/hyprland".source = ./.config/hyprland;
          # home.file."${config.xdg.configHome}/hypr/hyprlock".source = ./.config/hyprlock;
          # home.file."${config.xdg.configHome}/hypr/shaders".source = ./.config/shaders;

          # home.file."${config.xdg.configHome}/hypr/hypridle.conf".source = ./.config/hypridle.conf;
          # home.file."${config.xdg.configHome}/hypr/hyprlock.conf".source = ./.config/hyprlock.conf;

          # Use specified GPU for hyprland
          home.file."${config.xdg.configHome}/hypr/card" = lib.mkIf (
            rootConfig.noodles.desktops.hyprland_new.card != null
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.desktops.hyprland_new.card; };

          # wayland.windowManager.hyprland = {
          #   enable = true;

          #   extraConfig = ''
          #     # Defaults
          #     source=~/.config/hypr/hyprland/env.conf
          #     source=~/.config/hypr/hyprland/execs.conf
          #     source=~/.config/hypr/hyprland/general.conf
          #     source=~/.config/hypr/hyprland/rules.conf
          #     source=~/.config/hypr/hyprland/colors.conf
          #     source=~/.config/hypr/hyprland/keybinds.conf

          #     # Custom 
          #     source=~/.config/hypr/custom/env.conf
          #     source=~/.config/hypr/custom/execs.conf
          #     source=~/.config/hypr/custom/general.conf
          #     source=~/.config/hypr/custom/rules.conf
          #     source=~/.config/hypr/custom/keybinds.conf
          #   '';

          #   systemd.variables = [ "--all" ];
          # };
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
          hyprlock
          hypridle
          hyprshade
        ];
      };

      # environment = {
      #   systemPackages = with pkgs; [
      #     hyprlock
      #     hypridle
      #   ];

      #   sessionVariables = {
      #     # Required to run the correct GBM backend for nvidia GPUs on wayland
      #     GBM_BACKEND = "nvidia-drm";
      #     HYPRLAND_LOG_WLR = "1";
      #     # Apparently, without this nouveau may attempt to be used instead
      #     # (despite it being blacklisted)
      #     __GLX_VENDOR_LIBRARY_NAME = "nvidia";
      #     # Hardware cursors are currently broken on nvidia
      #     LIBVA_DRIVER_NAME = "nvidia";
      #     _JAVA_AWT_WM_NOREPARENTING = "1";
      #     XDG_SESSION_TYPE = "wayland";
      #     XDG_CURRENT_DESKTOP = "Hyprland";
      #     XDG_SESSION_DESKTOP = "Hyprland";
      #     WLR_NO_HARDWARE_CURSORS = "1";
      #     WLR_DRM_NO_MODIFIERS = "1";
      #     NIXOS_OZONE_WL = "1";
      #     __GL_THREADED_OPTIMIZATION = "1";
      #     __GL_SHADER_CACHE = "1";
      #     LIBSEAT_BACKEND = "logind";
      #   };
      # };

      # # Security
      # security = {
      #   pam.services.swaylock = {
      #     text = ''
      #       auth include login
      #     '';
      #   };
      # };

      xdg = {
        autostart.enable = true;
        portal = {
          enable = true;
          extraPortals = [ pkgs.xdg-desktop-portal-hyprland ];
        };
      };
    };
}
