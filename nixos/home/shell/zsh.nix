{ config, lib, pkgs, ... }:

{
  home.file.".p10k.zsh" = {
    enable = true;
    source = ./.p10k.zsh;
  };

  programs.zsh = {
    enable = true;
    enableCompletion = true;
    enableVteIntegration = true;
    autosuggestion.enable = true;
    syntaxHighlighting.enable = true;

    initExtra = ''
      . ~/.p10k.zsh
    '';
    
    antidote = {
      enable = true;
      plugins = [
        "zsh-users/zsh-autosuggestions"
        "romkatv/powerlevel10k"
        "ohmyzsh/ohmyzsh"
      ];
    };

    shellAliases = {
      ll = "ls -l";
      rebuild = "sudo nixos-rebuild switch --flake ~/.dotfiles/nixos";
    };
  };
}
