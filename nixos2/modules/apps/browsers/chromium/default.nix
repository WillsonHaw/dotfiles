{
  config,
  lib,
  pkgs,
  ...
}:

let
  vivaldi = pkgs.vivaldi.override {
    proprietaryCodecs = true;
    enableWidevine = true;
    commandLineArgs = "--disable-features=AllowQt";
  };
in
{
  home-manager.users.slumpy = {
    home.packages = [ vivaldi ];

    # programs.chromium = {
    #   enable = true;
    #   package = pkgs.brave;
    #   # package = pkgs.vivaldi;
    #   extensions = [
    #     { id = "cjpalhdlnbpafiamejdnhcphjbkeiagm"; } # ublock origin
    #   ];
    # };
  };
}
