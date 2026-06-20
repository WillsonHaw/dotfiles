# AGS - Widget framework for building custom Wayland desktop shells using Astal + Gnim.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

let
  agsPackages = inputs.ags.packages.${pkgs.stdenv.hostPlatform.system};
in
{
  options = {
    noodles.desktops.components.ags.enable = lib.mkEnableOption "Enable ags.";
  };

  config = lib.mkIf config.noodles.desktops.components.ags.enable {
    environment.systemPackages = with pkgs; [ adwaita-icon-theme ];

    home-manager.users.${config.noodles.user} = { config, ... }: {
      imports = [ inputs.ags.homeManagerModules.default ];

      programs.ags = {
        enable = true;
        extraPackages = with agsPackages; [
          hyprland
          battery
          network
          wireplumber
          tray
          pkgs.libadwaita
        ];
      };

      xdg.configFile."ags".source =
        config.lib.file.mkOutOfStoreSymlink
          "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/components/ags/.config";
    };
  };
}
