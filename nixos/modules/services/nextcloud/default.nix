# Nextcloud - Self-hosted cloud sync client for files, contacts, and calendars.
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
    home-manager.users.${config.noodles.user} = {
      services.nextcloud-client.enable = true;
    };
  };
}
