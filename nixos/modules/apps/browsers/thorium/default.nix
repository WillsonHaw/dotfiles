{
  config,
  inputs,
  vars,
  lib,
  ...
}:
let
  pkgs = import inputs.nixpkgs {
    config.allowUnfree = true;
    system = "x86_64-linux";
  };
in
with lib;
let
  # note to check if valid, make sure otherl like middleclickscroll work, on one being bad all features will stop working
  # https://github.com/Alex313031/thorium/blob/9bdeac89dd5cebe7120c063942ce0842dea40dec/infra/CMDLINE_FLAGS_LIST.md?plain=1#L1054 location of all flags
  thorium-flags_dot_conf = ''
    --enable-blink-features=MiddleClickAutoscroll 
    --enable-features=VaapiOnNvidiaGPUs
    --gtk-version=4 
    --custom-ntp=https://dashboard.icylair.com 
  '';
in
{
  options = {
    noodles.browsers.thorium.enable = lib.mkEnableOption "Enable Thorium.";
  };

  config = mkIf (config.noodles.browsers.thorium.enable) {
    environment = {
      systemPackages = with pkgs; [
        (pkgs.callPackage ./thorium.nix { commandLineArgs = thorium-flags_dot_conf; })
      ];
    }; # $XDG_CONFIG_HOME
    home-manager.users.slumpy = {
      xdg.desktopEntries = [
        {
          name = "image-viewer";
          mimeTypes = [ "image/*" ];
          exec = "qimgv";
        }
      ];
    };
  };
}
