# P4V - Perforce Helix visual client for version control.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  qtwebengine = pkgs.qt6Packages.qtwebengine;

  desktopItem = pkgs.makeDesktopItem {
    name = "p4v";
    desktopName = "P4V";
    genericName = "Perforce Visual Client";
    exec = "p4v";
    icon = "p4v";
    categories = [
      "Development"
      "RevisionControl"
    ];
  };

  p4v = pkgs.runCommand "p4v-wrapped" { nativeBuildInputs = [ pkgs.makeWrapper ]; } ''
    for f in p4admin p4merge p4v p4vc; do
      makeWrapper ${pkgs.p4v}/bin/$f $out/bin/$f \
        --set QTWEBENGINE_RESOURCES_PATH ${qtwebengine}/resources \
        --set QTWEBENGINE_LOCALES_PATH ${qtwebengine}/qtwebengine_locales \
        --set QTWEBENGINE_PROCESS_PATH ${qtwebengine}/libexec/QtWebEngineProcess
    done

    icons="$(dirname "$(readlink -f ${pkgs.p4v}/bin/p4v)")/../lib/P4VResources/icons"
    install -Dm644 "$icons/p4v.svg" $out/share/icons/hicolor/scalable/apps/p4v.svg
    install -Dm644 ${desktopItem}/share/applications/p4v.desktop $out/share/applications/p4v.desktop
  '';
in
{
  options = {
    noodles.apps.p4v.enable = lib.mkEnableOption "Enable P4V.";
  };

  config = lib.mkIf config.noodles.apps.p4v.enable {
    environment.systemPackages = [ p4v ];
  };
}
