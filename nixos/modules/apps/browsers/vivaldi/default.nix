{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.browsers.vivaldi.enable = lib.mkEnableOption "Enable Vivaldi.";
  };

  config = lib.mkIf config.noodles.apps.browsers.vivaldi.enable {
    home-manager.users.${config.noodles.user} =
      let
        vivaldi = pkgs.vivaldi.override {
          proprietaryCodecs = true;
          enableWidevine = true;
          commandLineArgs = "--disable-features=AllowQt";
        };
      in
      {
        home.packages = [ vivaldi ];
      };
  };
}
