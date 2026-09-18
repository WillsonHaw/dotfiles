{ lib, ... }:

let
  dirs = lib.attrNames (
    lib.filterAttrs (_: type: type == "directory") (builtins.readDir ./.)
  );
in
{
  options.noodles.ai.allowedSources = lib.mkOption {
    type = lib.types.listOf lib.types.str;
    default = [ ];
    description = "Source addresses/CIDRs allowed through the firewall to reach AI service ports.";
  };

  imports = map (d: ./${d}) dirs;
}
