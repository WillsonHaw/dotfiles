{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.components.eww.enable = lib.mkEnableOption "Enable Eww.";
  };

  config = lib.mkIf config.noodles.desktops.components.eww.enable {
    home-manager.users.${config.noodles.user} = {
      programs.eww.enable = true;
      programs.eww.configDir = ./.config;
    };
  };
}
