{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.system.display.enable = lib.mkEnableOption "Enable display management (kanshi).";
  };

  config = lib.mkIf config.noodles.system.display.enable {
    home-manager.users.${config.noodles.user} = {
      services.kanshi = {
        enable = true;
        systemdTarget = "hyprland-session.target";
        settings = [
          {
            profile = {
              name = "rayneo";
              outputs = [
                {
                  criteria = "DP-1";
                  status = "enable";
                  position = "0,0";
                  mode = "1920x1080";
                }
                {
                  criteria = "eDP-1";
                  status = "disable";
                }
              ];
            };
          }
          {
            profile = {
              name = "docked";
              outputs = [
                {
                  criteria = "HDMI-A-1";
                  status = "enable";
                  position = "0,0";
                }
                {
                  criteria = "eDP-1";
                  status = "enable";
                  position = "0,0";
                }
              ];
            };
          }
          {
            profile = {
              name = "undocked";
              outputs = [
                {
                  criteria = "eDP-1";
                  status = "enable";
                  position = "0,0";
                }
              ];
            };
          }
        ];
      };
    };
  };
}
