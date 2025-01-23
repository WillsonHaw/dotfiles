{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.desktops.module.hyprpanel.enable = lib.mkEnableOption "Enable hyprpanel.";
  };

  config = lib.mkIf config.noodles.desktops.module.hyprpanel.enable {
    nixpkgs.overlays = [ inputs.hyprpanel.overlay ];

    home-manager.users.slumpy = {
      imports = [ inputs.hyprpanel.homeManagerModules.hyprpanel ];

      programs.hyprpanel = {
        enable = true;

        # Add '/nix/store/.../hyprpanel' to your
        # Hyprland config 'exec-once'.
        # Default: false
        hyprland.enable = true;

        # Fix the overwrite issue with HyprPanel.
        # See below for more information.
        # Default: false
        overwrite.enable = true;

        # Import a theme from './themes/*.json'.
        # Default: ""
        theme = "catppuccin_mocha";

        # Configure bar layouts for monitors.
        # See 'https://hyprpanel.com/configuration/panel.html'.
        # Default: null
        layout = {
          "bar.layouts" = {
            "*" = {
              left = [
                "dashboard"
                "workspaces"
                "windowtitle"
              ];
              middle = [
                "media"
              ];
              right = [
                "volume"
                "clock"
                "notifications"
              ];
            };
            "0" = {
              left = [
                "dashboard"
                "workspaces"
                "windowtitle"
              ];
              middle = [
                "media"
              ];
              right = [
                "volume"
                "network"
                "bluetooth"
                "battery"
                "systray"
                "clock"
                "notifications"
              ];
            };
          };
        };

        # Configure and theme almost all options from the GUI.
        # Options that require '{}' or '[]' are not yet implemented,
        # except for the layout above.
        # See 'https://hyprpanel.com/configuration/settings.html'.
        # Default: <same as gui>
        settings = {
          bar.launcher.autoDetectIcon = true;
          bar.workspaces.show_icons = true;
          bar.network.showWifiInfo = true;

          menus.clock = {
            time = {
              military = true;
              hideSeconds = false;
            };
            weather.unit = "metric";
          };

          menus.dashboard.directories.enabled = false;
          menus.dashboard.stats.enable_gpu = true;

          theme.bar.border.location = "bottom";
          theme.bar.border.width = "0.1em";
          theme.bar.border_radius = "0.5em";

          theme.bar.buttons.radius = "0.5em";
          theme.bar.buttons.y_margins = "0.35em";

          theme.bar.margin_sides = "0.35em";
          theme.bar.margin_top = "0.35em";

          theme.bar.outer_spacing = "0.1em";

          theme.font.size = ".9rem";
          theme.font.weight = 400;

          wallpaper.enable = false;
        };
      };
    };
  };
}
