{
  config,
  lib,
  pkgs,
  ...
}:

let
  wayland_overlay = (
    self: super: {
      rofi-wayland-unwrapped = super.rofi-wayland-unwrapped.overrideAttrs (old: {
        src = super.fetchFromGitHub {
          owner = "lbonn";
          repo = "rofi";
          rev = "c6b4dfe0b5c813c7f374929194210f4e3aa2e75d";
          fetchSubmodules = true;
          sha256 = "sha256-7eMW4qdrGUUgeFI3ZueXCMMK1bCkeqrYDRunnZpUt3Y=";
        };
      });
    }
  );
in
{
  home-manager.users.slumpy = {
    nixpkgs.overlays = [ wayland_overlay ];

    home.packages = with pkgs; [ rofi-wayland-unwrapped ];

    programs.rofi = {
      plugins = [ pkgs.rofi-emoji ];
    };

    xdg.configFile."rofi".source = pkgs.symlinkJoin {
      name = "rofi-configs";
      paths =
        let
          rofi-themes = pkgs.fetchFromGitHub {
            owner = "adi1090x";
            repo = "rofi";
            rev = "7e236dd67fd98304e1be9e9adc2bed9106cf895b";
            sha256 = "sha256-K6WQ+olSy6Rorof/EGi9hP2WQpRONjuGREby+aBlzYg=";
          };
        in
        [ "${rofi-themes}/files" ];
    };
  };
}
