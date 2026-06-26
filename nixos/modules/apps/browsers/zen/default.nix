# Zen Browser - Minimalist Firefox-based browser focused on speed and privacy.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.zen.enable = lib.mkEnableOption "Enable Zen Browser.";
  };

  config = lib.mkIf config.noodles.apps.browsers.zen.enable {
    environment.systemPackages = [
      inputs.zen-browser.packages."${pkgs.stdenv.hostPlatform.system}".default
    ];

    # The zen-browser-flake changed the profile directory from ~/.config/zen to ~/.zen.
    # Point ~/.zen/profiles.ini at the original profile to survive future flake updates.
    home-manager.users.${config.noodles.user} = { ... }: {
      home.file.".zen/profiles.ini" = {
        force = true;
        text = ''
          [Profile0]
          Name=Default Profile
          IsRelative=0
          Path=/home/${config.noodles.user}/.config/zen/jngt20cx.Default Profile
          Default=1

          [General]
          StartWithLastProfile=1
          Version=2
        '';
      };
    };
  };
}
