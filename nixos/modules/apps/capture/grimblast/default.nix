{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options = {
    noodles.apps.capture.grimblast.enable = lib.mkEnableOption "Enable grimblast.";
  };

  config = lib.mkIf config.noodles.apps.capture.grimblast.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = [ inputs.hyprland-contrib.packages.${pkgs.stdenv.hostPlatform.system}.grimblast ];
    };
  };
}
