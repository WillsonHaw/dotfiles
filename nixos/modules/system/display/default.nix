{
  config,
  lib,
  pkgs,
  ...
}:

{
  # systemd.user.services.kanshi = {
  #   enable = true;
  #   description = "kanshi daemon";
  #   wantedBy = [ ];
  #   after = [ ];
  #   serviceConfig = {
  #     Type = "simple";
  #     ExecStart = ''${pkgs.kanshi}/bin/kanshi -c kanshi_config_file'';
  #   };
  # };

  home-manager.users.slumpy = {
    # home.packages = [ pkgs.wl-mirror ];

    services.kanshi = {
      # eDP-1 is the laptop screen
      # DP-2 is the docked monitor
      enable = true;
      systemdTarget = "hyprland-session.target";
      settings = [
        {
          profile = {
            name = "rayneo";
            outputs = [
              {
                # DP-1 when using USB-C output
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
          }
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
}
