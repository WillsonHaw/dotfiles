# SSH - OpenSSH server and client configuration.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.${config.noodles.user} =
    { config, ... }:
    {
      home.file."${config.home.homeDirectory}/.ssh/config".source = ./.config/config;
    };

  services.openssh = {
    enable = true;
    settings.PasswordAuthentication = false;
    settings.KbdInteractiveAuthentication = false;
  };

  programs.ssh.startAgent = true;

  # gnome-keyring (modules/services/keyring) auto-enables gcr-ssh-agent, which
  # conflicts with openssh's ssh-agent. Force it off so plain ssh-agent wins
  # everywhere — keyring stays on for non-SSH credential storage.
  services.gnome.gcr-ssh-agent.enable = lib.mkForce false;
}
