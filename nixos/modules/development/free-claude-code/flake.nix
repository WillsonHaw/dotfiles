{
  description = "On-demand shell for installing/updating Free Claude Code";

  inputs.nixpkgs.url = "nixpkgs/nixos-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      system = "x86_64-linux";
      pkgs = import nixpkgs { inherit system; };

      fcc-install = pkgs.writeShellApplication {
        name = "fcc-install";
        runtimeInputs = [ pkgs.curl ];
        text = ''
          curl -fsSL "https://raw.githubusercontent.com/Alishahryar1/free-claude-code/main/scripts/install.sh" | sh
        '';
      };
    in
    {
      packages.${system}.default = fcc-install;

      apps.${system}.default = {
        type = "app";
        program = "${fcc-install}/bin/fcc-install";
      };

      devShells.${system}.default = pkgs.mkShell {
        packages = [ fcc-install ];

        shellHook = ''
          export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
          echo "Run 'fcc-install' to install or update Free Claude Code."
          echo "fcc-server and the fcc-* agent launchers are on PATH once installed."
        '';
      };
    };
}
