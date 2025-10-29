{
  config,
  lib,
  pkgs,
  ...
}:

{
  xdg.mime.enable = true;
  xdg.mime.defaultApplications = {
    "text/html" = "zen.desktop";
    "x-scheme-handler/http" = "zen.desktop";
    "x-scheme-handler/https" = "zen.desktop";
    "x-scheme-handler/about" = "zen.desktop";
    "x-scheme-handler/unknown" = "zen.desktop";
    "x-scheme-handler/vscode" = "code-url-handler.desktop";
  };
}
