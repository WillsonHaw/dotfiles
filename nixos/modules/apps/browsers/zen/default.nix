# Zen Browser - Minimalist Firefox-based browser focused on speed and privacy.
{
  config,
  inputs,
  lib,
  pkgs,
  ...
}:

let
  cfg = config.noodles.apps.browsers.zen;
in
{
  options = {
    noodles.apps.browsers.zen = {
      enable = lib.mkEnableOption "Enable Zen Browser.";

      profilePath = lib.mkOption {
        type = lib.types.nullOr lib.types.str;
        default = null;
        example = "/home/slumpy/.zen/abcd1234.Default Profile";
        description = "Absolute path of the profile ~/.zen/profiles.ini points at. Null leaves profiles.ini unmanaged.";
      };
    };
  };

  config = lib.mkIf cfg.enable {
    environment.systemPackages = [
      inputs.zen-browser.packages."${pkgs.stdenv.hostPlatform.system}".default
    ];

    home-manager.users.${config.noodles.user} = lib.mkIf (cfg.profilePath != null) {
      home.file.".zen/profiles.ini" = {
        force = true;
        text = ''
          [Profile0]
          Name=Default Profile
          IsRelative=0
          Path=${cfg.profilePath}
          Default=1

          [General]
          StartWithLastProfile=1
          Version=2
        '';
      };
    };
  };
}
