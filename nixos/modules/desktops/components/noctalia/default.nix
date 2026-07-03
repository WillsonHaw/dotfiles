# Noctalia - Desktop shell built on Quickshell for Wayland compositors.
{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  options.noodles.desktops.components.noctalia.enable = lib.mkEnableOption "Noctalia shell";

  config = lib.mkIf config.noodles.desktops.components.noctalia.enable {
    nix.settings = {
      extra-substituters = [ "https://noctalia.cachix.org" ];
      extra-trusted-public-keys = [
        "noctalia.cachix.org-1:pCOR47nnMEo5thcxNDtzWpOxNFQsBRglJzxWPp3dkU4="
      ];
    };

    environment.systemPackages = [
      inputs.noctalia.packages.${pkgs.stdenv.hostPlatform.system}.default
    ];

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        imports = [ inputs.noctalia.homeModules.default ];

        programs.noctalia-shell = {
          enable = true;
          settings = { };
        };

        xdg.configFile = {
          "noctalia/plugins/waynergy".source =
            config.lib.file.mkOutOfStoreSymlink
              "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/components/noctalia/plugins/waynergy";
          "noctalia/plugins/wallhaven".source =
            config.lib.file.mkOutOfStoreSymlink
              "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/components/noctalia/plugins/wallhaven";
        };
      };
  };
}
