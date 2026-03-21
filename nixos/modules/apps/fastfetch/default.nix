{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.fastfetch.enable = lib.mkEnableOption "Enable fastfetch.";
  };

  config = lib.mkIf config.noodles.apps.fastfetch.enable {
    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        home.file."${config.xdg.configHome}/fastfetch".source = ./.config;

        programs.fastfetch.enable = true;
      };
  };
}
