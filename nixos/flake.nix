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
      # type = "git";
      # url = "https://github.com/hyprwm/Hyprland?submodules=1";
      # rev = "cba1ade848feac44b2eda677503900639581c3f4";
      # submodules = true;
      url = "git+https://github.com/hyprwm/Hyprland?ref=refs/tags/v0.41.1&submodules=1";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-contrib = {
      url = "github:hyprwm/contrib";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-plugins = {
      url = "github:hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    hy3 = {
      # type = "git";
      # url = "https://github.com/outfoxxed/hy3";
      # rev = "ca420ab45df8d5579c1306c3845f12f0d9738ac1";
      url = "github:outfoxxed/hy3?ref=hl0.41.0";
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
