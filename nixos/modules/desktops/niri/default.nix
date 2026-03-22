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
        portal.enable = true;
      };

      home-manager.users.${config.noodles.user} =
        {
          config,
          ...
        }:
        {
          imports = [ inputs.catppuccin.homeModules.catppuccin ];

          gtk.enable = true;

          catppuccin = {
            enable = true;
            flavor = "mocha";
            accent = "mauve";

            cursors.enable = true;
            kvantum.enable = true;
          };

          # Use specified GPU for niri
          home.file."${config.xdg.configHome}/niri/card" = lib.mkIf (
            rootConfig.noodles.device.gpu.card != ""
          ) { source = config.lib.file.mkOutOfStoreSymlink rootConfig.noodles.device.gpu.card; };
        };
    };
}
