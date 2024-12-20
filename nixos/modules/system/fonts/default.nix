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
      nerd-fonts.jetbrains-mono
      nerd-fonts.fira-code
      nerd-fonts.space-mono
      nerd-fonts.dejavu-sans-mono
    ];
  };
}
