# Greeter - Display manager / login screen for Wayland compositors.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options.noodles.desktops.components.greeter = lib.mkOption {
    type = lib.types.nullOr (
      lib.types.enum [
        "regreet"
      ]
    );
    default = null;
    description = "Greeter to enable. Only one may be active.";
  };

  config = lib.mkIf (config.noodles.desktops.components.greeter == "regreet") {
    programs.regreet = {
      enable = true;
      theme = {
        package = pkgs.catppuccin-gtk.override {
          accents = [ "mauve" ];
          variant = "mocha";
        };
        name = "catppuccin-mocha-mauve-standard+default";
      };
      cursorTheme = {
        package = pkgs.catppuccin-cursors.mochaMauve;
        name = "catppuccin-mocha-mauve-cursors";
      };
    };
  };
}
