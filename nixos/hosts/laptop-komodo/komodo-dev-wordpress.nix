# Local development dependencies for the Komodo WordPress app (~/repos/komodo).
# See README.md there for the full setup: VIP-CLI creates and drives the
# `komodo-local` dev-env (Lando/Docker under the hood); `composer`, `phpcs`,
# and `phpunit` run directly on the host, not inside the dev-env containers.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  # Newer VIP-CLI releases dropped EJS support for .wpvip/vip-dev-env.yml.ejs,
  # which this repo still relies on. Pin until the repo migrates off EJS.
  vipCliVersion = "4.0.10";
in
{
  # Backs `vip dev-env` (Lando-managed containers): php-fpm, MariaDB, nginx, Mailpit, phpMyAdmin.
  virtualisation.docker.enable = true;

  users.users.${config.noodles.user}.extraGroups = [ "docker" ];

  # Pins the theme's legacy Gulp toolchain (degica-steam-deck-wordpress needs Node
  # 14.21.3) via each package.json's "volta" field.
  noodles.development.volta.enable = true;

  environment.systemPackages = with pkgs; [
    # Drives every local dev task (composer/vip-cli/wp-cli wrappers) via the repo's Makefile.
    gnumake
    # Matches the PHP version CI lints and tests against (.github/workflows,
    # composer.json "require".php).
    php82
    php82Packages.composer
    # scripts/update-lando-global-config.py (KMC proxy port setup, Makefile kmc-set-lando-global).
    python3
    # tests/load/*.ts (Makefile loadtest, loadtest-auth-cart targets).
    k6
  ];

  home-manager.users.${config.noodles.user} =
    { lib, ... }:
    {
      # VIP-CLI (`vip`) isn't packaged in nixpkgs; Volta installs and pins it as a
      # global npm tool instead. Re-runs only when the pinned version drifts, since
      # the shim otherwise persists across rebuilds.
      # Volta refuses to install any global package until a default Node runtime
      # is pinned, so that has to happen first.
      home.activation.komodoVipCli = lib.hm.dag.entryAfter [ "writeBoundary" ] ''
        if ! [ -f "$HOME/.volta/tools/user/platform.json" ]; then
          run ${pkgs.volta}/bin/volta install node@22
        fi

        vipCliPackageJson="$HOME/.volta/tools/user/packages/@automattic/vip.json"

        if ! [ -f "$vipCliPackageJson" ] || ! grep -q '"version": "${vipCliVersion}"' "$vipCliPackageJson"; then
          run ${pkgs.volta}/bin/volta install @automattic/vip@${vipCliVersion}
        fi
      '';
    };
}
