{
  config,
  lib,
  pkgs,
  ...
}:

{
  home.file."${config.xdg.configHome}/hypr/custom".source = ./.config/custom;
  home.file."${config.xdg.configHome}/hypr/hyprland".source = ./.config/hyprland;
  home.file."${config.xdg.configHome}/hypr/hyprlock".source = ./.config/hyprlock;
  home.file."${config.xdg.configHome}/hypr/shaders".source = ./.config/shaders;

  home.file."${config.xdg.configHome}/hypr/hypridle.conf".source = ./.config/hypridle.conf;
  home.file."${config.xdg.configHome}/hypr/hyprlock.conf".source = ./.config/hyprlock.conf;

  # Use intel GPU for hyprland
  home.file."${config.xdg.configHome}/hypr/card".source = config.lib.file.mkOutOfStoreSymlink "/dev/dri/by-path/pci-0000:00:02.0-card";

  wayland.windowManager.hyprland = {
    enable = true;

    extraConfig = ''
      # Defaults
      source=~/.config/hypr/hyprland/env.conf
      source=~/.config/hypr/hyprland/execs.conf
      source=~/.config/hypr/hyprland/general.conf
      source=~/.config/hypr/hyprland/rules.conf
      source=~/.config/hypr/hyprland/colors.conf
      source=~/.config/hypr/hyprland/keybinds.conf

      # Custom 
      source=~/.config/hypr/custom/env.conf
      source=~/.config/hypr/custom/execs.conf
      source=~/.config/hypr/custom/general.conf
      source=~/.config/hypr/custom/rules.conf
      source=~/.config/hypr/custom/keybinds.conf
    '';

    systemd.variables = [ "--all" ];
  };
}
