{ lib, ... }:

let
  dirs = lib.attrNames (
    lib.filterAttrs (_: type: type == "directory") (builtins.readDir ./.)
  );
in
{
  imports = map (d: ./${d}) dirs;
}
