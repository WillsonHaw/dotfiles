{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.desktops.module.wlogout.enable = lib.mkEnableOption "Enable wlogout.";
  };

  config = lib.mkIf config.noodles.desktops.module.wlogout.enable {
    home-manager.users.slumpy = {
      programs.wlogout.enable = true;
    };
  };
}
