{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.services.nextcloud.enable = lib.mkEnableOption "Enable NextCloud.";
  };

  config = lib.mkIf config.noodles.services.nextcloud.enable {
    home-manager.users.slumpy = {
      services.nextcloud-client.enable = true;
    };
  };
}
