{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.chromium = {
    enable = true;
    package = pkgs.brave;
    # package = pkgs.vivaldi;
    extensions = [
      { id = "cjpalhdlnbpafiamejdnhcphjbkeiagm"; } # ublock origin
    ];
  };
}
