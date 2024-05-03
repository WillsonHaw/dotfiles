{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy =
    { config, ... }:
    {
      home.file."${config.home.homeDirectory}/.ssh/config".source = ./.config/config;
    };

  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;
    settings.KbdInteractiveAuthentication = false;
  };
}
