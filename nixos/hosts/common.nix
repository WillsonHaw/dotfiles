{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = with pkgs; [
    inotify-tools
    nixfmt
    jq
    unzip
    qdirstat
    cifs-utils
  ];

  nix.settings = {
    download-buffer-size = 524288000; # 500 MiB
  };

  imports = [ ../modules ];

  boot.kernelPackages = pkgs.linuxPackages_latest;

  nixpkgs.config.allowUnfree = true;

  users.mutableUsers = false;

  # Set your time zone.
  time.timeZone = "America/Vancouver";

  # Select internationalisation properties.
  i18n.defaultLocale = "en_US.UTF-8";

  # Some programs need SUID wrappers, can be configured further or are
  # started in user sessions.
  programs.mtr.enable = true;
  programs.gnupg.agent = {
    enable = true;
    enableSSHSupport = true;
  };


  nix.gc = {
    automatic = true;
    randomizedDelaySec = "14m";
    options = "--delete-older-than 10d";
  };

  nix.settings.experimental-features = [
    "nix-command"
    "flakes"
  ];

  # Enable modules that should be active on all hosts
  noodles = {
    shell = {
      kitty.enable = true;
      zsh.enable = true;
    };

    apps = {
      btop.enable = true;
      chiaki.enable = true;
      capture.flameshot.enable = true;
      capture.grimblast.enable = true;
      fastfetch.enable = true;
      ferdium.enable = true;
      gimp.enable = true;
      gparted.enable = true;
      qimgv.enable = true;
      steam.enable = true;
      vim.enable = true;
      vlc.enable = true;
      vscode.enable = true;
      guitar.qjackctl.enable = true;
    };
  };
}
