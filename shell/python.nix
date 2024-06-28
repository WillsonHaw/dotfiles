let
  pkgs = import <nixpkgs> { };
in
pkgs.mkShell {
  packages = with pkgs; [
    (python3.withPackages (py: [
      py.lxml
      py.pip
      py.pandas
      py.requests
      py.setuptools
    ]))
  ];
}
