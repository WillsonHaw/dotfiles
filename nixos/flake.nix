{
  description = "My Flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland = {
      url = "git+https://github.com/hyprwm/Hyprland?ref=refs/tags/v0.41.1&submodules=1";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-contrib = {
      url = "github:hyprwm/contrib";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-plugins = {
      url = "git+https://github.com/hyprwm/hyprland-plugins?ref=refs/tags/v0.41.1";
      inputs.hyprland.follows = "hyprland";
    };

    hy3 = {
      url = "github:outfoxxed/hy3?ref=hl0.41.1";
      inputs.hyprland.follows = "hyprland";
    };

    nixos-hardware.url = "github:NixOS/nixos-hardware/master";

    ags.url = "github:Aylur/ags";

    catppuccin.url = "github:catppuccin/nix";

    nixpkgs-wayland = {
      url = "github:nix-community/nixpkgs-wayland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nix-flatpak.url = "github:gmodena/nix-flatpak/?ref=v0.4.1";
  };

  outputs =
    inputs@{
      nixpkgs,
      home-manager,
      nixos-hardware,
      nix-flatpak,
      ...
    }:
    {
      nixosConfigurations = {
        slumpy-laptop = nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          specialArgs = {
            inherit inputs;
          };
          modules = [
            home-manager.nixosModules.home-manager
            nixos-hardware.nixosModules.msi-gs60
            nix-flatpak.nixosModules.nix-flatpak
            ./hosts/laptop
          ];
        };

        slumpy-desktop = nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          specialArgs = {
            inherit inputs;
          };
          modules = [
            (
              { pkgs, config, ... }:
              {
                config = {
                  nix.settings = {
                    # add binary caches
                    trusted-public-keys = [
                      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
                      "nixpkgs-wayland.cachix.org-1:3lwxaILxMRkVhehr5StQprHdEo4IrE8sRho9R9HOLYA="
                    ];
                    substituters = [
                      "https://cache.nixos.org"
                      "https://nixpkgs-wayland.cachix.org"
                    ];
                  };

                  # use it as an overlay
                  nixpkgs.overlays = [ inputs.nixpkgs-wayland.overlay ];
                };
              }
            )
            home-manager.nixosModules.home-manager
            nix-flatpak.nixosModules.nix-flatpak
            ./hosts/desktop
          ];
        };
      };
    };
}
