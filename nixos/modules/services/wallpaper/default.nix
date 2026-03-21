{ lib, ... }:

let
  entries = builtins.readDir ./.;
  dirs = lib.attrNames (lib.filterAttrs (_: type: type == "directory") entries);
  nixFiles = lib.attrNames (
    lib.filterAttrs (
      name: type: type == "regular" && name != "default.nix" && lib.hasSuffix ".nix" name
    ) entries
  );
in
{
  imports = (map (d: ./${d}) dirs) ++ (map (f: ./${f}) nixFiles);
}
