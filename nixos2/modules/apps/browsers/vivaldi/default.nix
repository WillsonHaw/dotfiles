{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.browsers.vivaldi.enable = lib.mkEnableOption "Enable Vivaldi.";
  };

  config = lib.mkIf config.noodles.browsers.vivaldi.enable {
    home-manager.users.slumpy =
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
