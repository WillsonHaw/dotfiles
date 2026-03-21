{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.remmina.enable = lib.mkEnableOption "Enable Remmina.";
  };

  config = lib.mkIf config.noodles.services.remmina.enable {
    home-manager.users.${config.noodles.user} = {
      services.remmina.enable = true;
    };
  };
}
