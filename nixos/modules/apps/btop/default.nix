{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.btop.enable = lib.mkEnableOption "Enable btop.";
  };

  config = lib.mkIf config.noodles.apps.btop.enable {
    home-manager.users.${config.noodles.user} = {
      programs.btop.enable = true;
    };
  };
}
