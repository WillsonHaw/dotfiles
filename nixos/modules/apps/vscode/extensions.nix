# Turns extensions.txt (one "publisher.name" id per line, kept up to date by
# the `sync-vscode-extensions` shell function) into packages.
{ lib, pkgs }:
let
  ids = lib.filter (id: id != "") (lib.splitString "\n" (builtins.readFile ./extensions.txt));

  # Some extensions (e.g. oxc.oxc-vscode) get a nixpkgs-specific postPatch that assumes
  # nixpkgs' own pinned version/schema. Substituting nix-vscode-extensions' auto-updated
  # (and possibly older/newer) marketplace version breaks that patch, so prefer nixpkgs'
  # own package when it exists and only fall back to the marketplace for the rest.
  toExtension =
    id:
    let
      parts = lib.splitString "." id;
      publisher = builtins.head parts;
      name = lib.concatStringsSep "." (lib.tail parts);
    in
    if pkgs.vscode-extensions ? ${publisher} && pkgs.vscode-extensions.${publisher} ? ${name} then
      pkgs.vscode-extensions.${publisher}.${name}
    else
      pkgs.vscode-marketplace.${publisher}.${name};
in
map toExtension ids
