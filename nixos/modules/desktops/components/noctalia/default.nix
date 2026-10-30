# Noctalia - Desktop shell built on Quickshell for Wayland compositors.
{
  config,
  lib,
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

    home-manager.users.${config.noodles.user} =
      { config, ... }:
      {
        imports = [ inputs.noctalia.homeModules.default ];

        programs.noctalia = {
          enable = true;
          settings.widget.tray.hide_passive = false;
          settings.plugins = {
            enabled = [
              "slumpy/waynergy"
              "slumpy/wallhaven"
            ];
            source = [
              {
                name = "dotfiles";
                kind = "path";
                location = "${config.home.homeDirectory}/dotfiles/nixos/modules/desktops/components/noctalia/plugins";
                enabled = true;
              }
            ];
          };
        };
      };
  };
}
