# Git - Version control system configuration with aliases and home-manager integration.
{
  config,
  lib,
  pkgs,
  ...
}:

let
  git-init-keys = pkgs.writeShellApplication {
    name = "git-init-keys";
    runtimeInputs = with pkgs; [
      git
      openssh
      gnupg
      gawk
      gnugrep
      coreutils
    ];
    text = builtins.readFile ./init-keys.sh;
  };
in
{
  home-manager.users.${config.noodles.user} = {
    home.packages = [ git-init-keys ];

    programs.git = {
      enable = true;
      # signingkey is per-host (depends on the generated GPG fingerprint), so
      # git-init-keys writes it to ~/.config/git/config.local instead.
      includes = [ { path = "~/.config/git/config.local"; } ];
      settings = {
        init.defaultBranch = "main";
        pull.rebase = true;
        column.ui = "auto";
        branch.sort = "-committerdate";

        commit.gpgsign = true;
        tag.gpgsign = true;

        user = {
          name = "WillsonHaw";
          email = "willsonhaw@gmail.com";
        };

        alias = {
          st = "status";
          wc = "whatchanged";
          cp = "cherry-pick";
          co = "checkout";
          pu = "pull -r";
          rc = "rebase --continue";
          undo-ci = "reset --soft HEAD~";
          fixup = "!sh -c 'REV=$(git rev-parse $1) && git commit --fixup $@ && git rebase -i --autostash --autosquash $REV^' -";
          cleanup = "!git branch --merged | grep -v -P '^\\*|master|main|develop|staging' | xargs -n1 -r git branch -d";
          l = "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr)%C(bold blue)<%an>%Creset' --abbrev-commit";
        };
      };
    };
  };
}
