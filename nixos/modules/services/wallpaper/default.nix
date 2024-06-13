{
  config,
  lib,
  pkgs,
  ...
}:

let
  wallpaperengine_overlay = (
    self: super: {
      linux-wallpaperengine = super.linux-wallpaperengine.overrideAttrs (old: {
        src = super.fetchFromGitHub {
          owner = "Almamu";
          repo = "linux-wallpaperengine";
          rev = "e28780562bdf8bcb2867cca7f79b2ed398130eb9";
          hash = "sha256-VvrYOh/cvWxDx9dghZV5dcOrfMxjVCzIGhVPm9d7P2g=";
        };
      });
    }
  );
in
{
  options = {
    noodles.services.swww.enable = lib.mkEnableOption "Enable Swww.";
    noodles.services.wallpaperengine.enable = lib.mkEnableOption "Enable Wallpaper Engine.";
  };

  config = lib.mkMerge [
    (lib.mkIf config.noodles.services.wallpaperengine.enable {
      nixpkgs.config.permittedInsecurePackages = [ "freeimage-unstable-2021-11-01" ];
      nixpkgs.overlays = [ wallpaperengine_overlay ];
      environment.systemPackages = with pkgs; [ linux-wallpaperengine ];
    })

    (lib.mkIf config.noodles.services.swww.enable {
      home-manager.users.slumpy = {
        home.packages = [ pkgs.swww ];
      };
    })
  ];
}
