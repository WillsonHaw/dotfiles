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
      wallhaven_key = {
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
  # Workaround: patool's test suite fails on python3.14 (missing bzip2/xz/lzma
  # support in the sandbox), breaking bottles which depends on it
  nixpkgs.overlays = [
    (final: prev: {
      openldap = prev.openldap.overrideAttrs (old: {
        doCheck = false;
      });

      python3 = prev.python3.override {
        packageOverrides = pyFinal: pyPrev: {
          patool = pyPrev.patool.overrideAttrs (old: {
            doCheck = false;
            doInstallCheck = false;
          });
        };
      };
      python3Packages = final.python3.pkgs;

    })
  ];

  users.mutableUsers = false;

  # Wheel users can sudo without a password. Safe because the only login path
  # is SSH key auth (PasswordAuthentication = false). Required on fresh machines
  # before SOPS has decrypted the user password for the first time.
  security.sudo.wheelNeedsPassword = false;

  # Allow sudo without a TTY so tools like Claude Code can run sudo commands.
  security.sudo.extraConfig = ''
    Defaults !requiretty
    Defaults timestamp_type=global
  '';

  boot.kernelPackages = lib.mkDefault pkgs.linuxPackages_latest;

  time.timeZone = "America/Vancouver";

  i18n.defaultLocale = "en_US.UTF-8";

  networking.hosts = {
    "10.0.0.100" = [ "slumpy-vm-home" "slumpy-vm-home.local" ];
    "10.0.0.201" = [ "slumpy-vm-komodo" "slumpy-vm-komodo.local" ];
    "10.0.0.202" = [ "slumpy-vm-noodlefish" "slumpy-vm-noodlefish.local" ];
  };

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

  # catppuccin/nix is imported unconditionally by the hyprland/niri desktop
  # modules (imports aren't gated by mkIf), so every host — including
  # headless ones — picks up the module. Without an explicit autoEnable,
  # it falls back to legacy behavior (enable = true) and warns. Desktop
  # hosts override both back to true via mkIf on their environment.
  catppuccin = {
    enable = lib.mkDefault false;
    autoEnable = lib.mkDefault false;
  };

  # Headless-safe defaults — applied to every host.
  # GUI/desktop defaults live in ./desktop-base.nix and are opted into by
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
