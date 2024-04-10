{ config, lib, pkgs, ... }:

let
  vscode-server = {
    url = "https://github.com/msteen/nixos-vscode-server/tarball/master";
    sha256 = "1mrc6a1qjixaqkv1zqphgnjjcz9jpsdfs1vq45l1pszs9lbiqfvd";
  };
in
{
  imports = [
    "${fetchTarball vscode-server}/modules/vscode-server/home.nix"
  ];
  
  services.vscode-server.enable = true;

  programs.vscode = {
    enable = true;
  };

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
}
