{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    home.file.".p10k.zsh" = {
      enable = true;
      source = ./.config/.p10k.zsh;
    };

    programs.zsh = {
      enable = true;
      enableCompletion = true;
      enableVteIntegration = true;
      autosuggestion.enable = true;
      syntaxHighlighting.enable = true;

      initContent = ''
        . ~/.p10k.zsh

        function offload() {
          export __NV_PRIME_RENDER_OFFLOAD=1
          export __NV_PRIME_RENDER_OFFLOAD_PROVIDER=NVIDIA-G0
          export __GLX_VENDOR_LIBRARY_NAME=nvidia
          export __VK_LAYER_NV_optimus=NVIDIA_only
          exec "$@"
        }

        function rebuild() {
          sudo nixos-rebuild switch --flake ~/dotfiles/nixos$@
        }

        function volume() {
          wpctl set-volume @DEFAULT_AUDIO_SINK@ $@%
        }

        function mount-iso() {
          sudo mount -o loop $@
        }

        if [[ $(tty) == /dev/tty1 ]] then
          Hyprland 2>&1 > /dev/null;
        fi
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
        hyprlog = "code /tmp/hypr/$(ls -t /tmp/hypr/ | head -n 2 | tail -n 1)/hyprland.log";
        bright-up = "brillo -q -A 5";
        bright-down = "brillo -q -U 5";
        pp = "pnpm";

        # VPN
        wg-up = "sudo systemctl start wg-quick-wg0.service";
        wg-down = "sudo systemctl stop wg-quick-wg0.service";
        ts-up = "sudo tailscale up";
        ts-down = "sudo tailscale down";
      };
    };
  };

  environment.pathsToLink = [ "/share/zsh" ];
}
