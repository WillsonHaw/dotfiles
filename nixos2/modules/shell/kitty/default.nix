{
  config,
  lib,
  pkgs,
  ...
}:

{
  home-manager.users.slumpy = {
    programs.kitty = {
      enable = true;
      shellIntegration.enableZshIntegration = true;
      theme = "Cherry";
    };
  };
}
