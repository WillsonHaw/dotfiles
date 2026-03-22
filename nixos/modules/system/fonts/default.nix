# Fonts - System font packages including Nerd Fonts, Font Awesome, and Comic Mono.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.${config.noodles.user} = {
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
