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
    home-manager.users.slumpy = {
      services.remmina.enable = true;
    };
  };
}
