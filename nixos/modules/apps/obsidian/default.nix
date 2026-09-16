# Obsidian - Markdown-based knowledge base and note-taking app.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.obsidian.enable = lib.mkEnableOption "Enable obsidian.";
  };

  config = lib.mkIf config.noodles.apps.obsidian.enable {
    environment.systemPackages = [ pkgs.obsidian ];
  };
}
