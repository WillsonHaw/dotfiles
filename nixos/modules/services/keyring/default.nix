{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.seahorse.enable = true;
  services.gnome.gnome-keyring.enable = true;

  security.pam.services = {
    #   greetd.enableKwallet = true;
    greetd.enableGnomeKeyring = true;
    #   swaylock = { };
  };

  # environment.systemPackages = with pkgs; [ gnome.seahorse ];
}
