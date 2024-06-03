{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.module.eww.enable = lib.mkEnableOption "Enable Eww.";
  };

  config = lib.mkIf config.noodles.desktops.module.eww.enable {
    home-manager.users.slumpy = {
      programs.eww.enable = true;
      programs.eww.configDir = ./.config;
    };
  };
}
