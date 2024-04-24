{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = with pkgs; [
    brightnessctl
    curl
    evtest
    gnome.seahorse
    libdbusmenu-gtk3
    libnotify
    killall
    nixfmt-rfc-style
  ];

  boot.kernelPackages = pkgs.linuxKernel.packages.linux_6_8;

  nixpkgs.config.allowUnfree = true;

  users.mutableUsers = false;

  # Set your time zone.
  time.timeZone = "America/Vancouver";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  # programs.mtr.enable = true;
  # programs.gnupg.agent = {
  #   enable = true;
  #   enableSSHSupport = true;
  # };

  system.stateVersion = "23.11"; # Did you read the comment?

  nix.settings.experimental-features = [
    "nix-command"
    "flakes"
  ];

  environment.variables.EDITOR = "vim";

  services.printing.enable = true;

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
