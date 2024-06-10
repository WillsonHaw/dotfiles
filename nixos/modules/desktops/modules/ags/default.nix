{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.desktops.module.ags.enable = lib.mkEnableOption "Enable ags.";
  };

  config = lib.mkIf config.noodles.desktops.module.ags.enable {
    environment.systemPackages = with pkgs; [ gnome.adwaita-icon-theme ];

    home-manager.users.slumpy = {
      imports = [ inputs.ags.homeManagerModules.default ];

      programs.ags = {
        enable = true;

        # null or path, leave as null if you don't want hm to manage the config
        configDir = ./.config;

        # additional packages to add to gjs's runtime
        extraPackages = with pkgs; [
          gtksourceview
          webkitgtk
          accountsservice
        ];
      };
    };
  };
}
