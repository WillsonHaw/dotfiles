# wf-recorder - Screen recorder for wlroots-based Wayland compositors.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  options = {
    noodles.apps.capture.wf-recorder.enable = lib.mkEnableOption "Enable wf-recorder.";
  };

  config = lib.mkIf config.noodles.apps.capture.wf-recorder.enable {
    home-manager.users.${config.noodles.user} = {
      home.packages = with pkgs; [
        wf-recorder
        slurp
      ];
    };
  };
}
