# Chiaki - Open-source PlayStation 4/5 remote play client.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.chiaki.enable = lib.mkEnableOption "Enable chiaki.";
  };

  config = lib.mkIf config.noodles.apps.chiaki.enable {
    environment.systemPackages = [
      # chiaki-ng's Vulkan hwdecode code doesn't build against ffmpeg 9.0's
      # AVVulkanDeviceContext (fields it needs were removed there); pin to
      # ffmpeg_8, which still has them. See streetpea/chiaki-ng#795.
      (pkgs.chiaki-ng.override { ffmpeg = pkgs.ffmpeg_8; })
    ];
  };
}
