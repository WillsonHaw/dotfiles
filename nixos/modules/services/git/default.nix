{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    programs.git = {
      enable = true;
      userName = "WillsonHaw";
      userEmail = "willsonhaw@gmail.com";
      aliases = {
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
      extraConfig = {
        init.defaultBranch = "main";
        pull.rebase = true;
        column.ui = "auto";
        branch.sort = "-committerdate";
      };
    };
  };
}
