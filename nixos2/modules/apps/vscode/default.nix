{
  config,
  lib,
  pkgs,
  ...
}:

{
  programs.nix-ld.enable = true;

  home-manager.users.slumpy = {
    programs.vscode = {
      enable = true;
    };

    programs.vscode.package =
      (pkgs.vscode.override { isInsiders = false; }).overrideAttrs
        (oldAttrs: rec {
          src = pkgs.fetchurl {
            name = "VSCode_1.89.0_linux-x64.tar.gz";
            url = "https://update.code.visualstudio.com/1.89.0/linux-x64/stable";
            sha256 = "0hy1ppv7wzyy581k3skmckaas0lwkx5l6w4hk1ml5f2cpkkxhq5w";
          };
        });
  };
}
