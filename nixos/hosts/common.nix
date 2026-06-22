{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  imports = [
    ../modules
    ../users/slumpy.nix
    inputs.sops-nix.nixosModules.sops
  ];

  sops = {
    defaultSopsFile = ../secrets/secrets.yaml;
    defaultSopsFormat = "yaml";

    age.keyFile = "/home/${config.noodles.user}/.config/sops/age/keys.txt";

    secrets = {
      hashed_host_pw = { };
      host_pw = {
        owner = config.noodles.user;
      };
    };
  };

  environment.systemPackages = with pkgs; [
    claude-code
    inotify-tools
    nixfmt
    jq
    unzip
    cifs-utils
  ];

  nix.settings = {
    download-buffer-size = 524288000; # 500 MiB
    experimental-features = [
      "nix-command"
      "flakes"
    ];
  };

  nixpkgs.config.allowUnfree = true;

  # Workaround: openldap test017 is flaky on nixpkgs-unstable
  nixpkgs.overlays = [
    (final: prev: {
      openldap = prev.openldap.overrideAttrs (old: {
        doCheck = false;
      });

    })
  ];

  users.mutableUsers = false;

  # Allow sudo without a TTY so tools like Claude Code can run sudo commands.
  # Still requires cached credentials — run `sudo -v` once per session.
  security.sudo.extraConfig = ''
    Defaults !requiretty
    Defaults timestamp_type=global
  '';

  boot.kernelPackages = lib.mkDefault pkgs.linuxPackages_latest;

  time.timeZone = "America/Vancouver";

  i18n.defaultLocale = "en_US.UTF-8";

  programs.mtr.enable = true;
  programs.gnupg.agent = {
    enable = true;
    # SSH auth lives in ssh-agent (see modules/services/ssh); gpg-agent is
    # for GPG signing only.
    enableSSHSupport = false;
  };

  nix.gc = {
    automatic = true;
    randomizedDelaySec = "14m";
    options = "--delete-older-than 10d";
  };

  # Headless-safe defaults — applied to every host.
  # GUI/desktop defaults live in ./desktop-defaults.nix and are opted into by
  # each desktop-class host.
  noodles = {
    user = lib.mkDefault "slumpy";

    shell.zsh.enable = true;

    apps = {
      compression = {
        p7zip.enable = true;
        unrar.enable = true;
      };

      btop.enable = true;
      fastfetch.enable = true;
      vim.enable = true;
    };
  };
}
