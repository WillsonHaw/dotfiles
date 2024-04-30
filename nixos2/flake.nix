{
  description = "My Flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    # Latest Hyprland
    hyprland = {
      url = "github:hyprwm/Hyprland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-contrib = {
      url = "github:hyprwm/contrib";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixos-hardware.url = "github:NixOS/nixos-hardware/master";

    ags.url = "github:Aylur/ags";

    nixpkgs-wayland = {
      url = "github:nix-community/nixpkgs-wayland";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      nixpkgs,
      home-manager,
      nixos-hardware,
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
            # {
            #   home-manager.useGlobalPkgs = true;
            #   home-manager.useUserPackages = true;
            #   home-manager.users.slumpy = import ./users/slumpy.nix;
            #   home-manager.extraSpecialArgs = {
            #     inherit inputs;
            #   };
            # }
            nixos-hardware.nixosModules.msi-gs60
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
            ./hosts/desktop
          ];
        };
      };
    };
}
