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
      comic-mono
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
          "JetBrainsMono"
          "FiraCode"
          "SpaceMono"
          "DejaVuSansMono"
        ];
      })
    ];
  };
}
