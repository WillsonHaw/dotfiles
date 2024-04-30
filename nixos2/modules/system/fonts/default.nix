{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    home.packages = with pkgs; [
      font-awesome
      fontconfig
    ];

    fonts.fontconfig = {
      enable = true;
    };
  };

  fonts = {
    enableDefaultPackages = true;
    fontDir.enable = true;

    packages = with pkgs; [
      (nerdfonts.override {
        fonts = [
          "FiraCode"
          "SpaceMono"
          "JetBrainsMono"
          "DejaVuSansMono"
        ];
      })
    ];
  };
}
