{ lib, ... }:

let
  dirs = lib.attrNames (
    lib.filterAttrs (_: type: type == "directory") (builtins.readDir ./.)
  );
in
{
  imports = map (d: ./${d}) dirs;

  systemd.services.NetworkManager-wait-online.enable = lib.mkForce false;
  systemd.services.systemd-networkd-wait-online.enable = lib.mkForce false;
}
