{
  config,
  lib,
  pkgs,
  ...
}:

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

      function offload() {
        export __NV_PRIME_RENDER_OFFLOAD=1
        export __NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0
        export __GLX_VENDOR_LIBRARY_NAME=nvidia
        export __VK_LAYER_NV_optimus=NVIDIA_only
        exec "$@"
      }

      function rebuild() {
        sudo nixos-rebuild switch --flake ~/.dotfiles/nixos$@
      }
    '';

    envExtra = ''
      export XDG_DATA_HOME="$HOME/.local/share";
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
    };
  };
}