# AGS - Widget framework for building custom Wayland desktop shells in JavaScript.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.desktops.components.ags.enable = lib.mkEnableOption "Enable ags.";
  };

  config = lib.mkIf config.noodles.desktops.components.ags.enable {
    environment.systemPackages = with pkgs; [ adwaita-icon-theme ];

    home-manager.users.${config.noodles.user} = {
      imports = [ inputs.ags.homeManagerModules.default ];

      programs.ags = {
        enable = true;

        # null or path, leave as null if you don't want hm to manage the config
        configDir = ./.config;

        # additional packages to add to gjs's runtime
        extraPackages = with pkgs; [
          gtksourceview
          webkitgtk_6_0
          accountsservice
        ];
      };
    };
  };
}
