{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    programs.chromium = {
      enable = true;
      package = pkgs.brave;
      # package = pkgs.vivaldi;
      extensions = [
        { id = "cjpalhdlnbpafiamejdnhcphjbkeiagm"; } # ublock origin
      ];
    };
  };
}
