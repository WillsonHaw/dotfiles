{ config, lib, pkgs, ... }:

{
  programs.rofi = {
    enable = true;
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
      [
        "${rofi-themes}/files"
      ];
  };
}
