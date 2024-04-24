{
  description = "Willson's Flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    home-manager.url = "github:nix-community/home-manager";
    home-manager.inputs.nixpkgs.follows = "nixpkgs";
    hyprland-contrib.url = "github:hyprwm/contrib";
    hyprland-contrib.inputs.nixpkgs.follows = "nixpkgs";
    nixos-hardware.url = "github:NixOS/nixos-hardware/master";
    ags.url = "github:Aylur/ags";
  };

  outputs =
    inputs@{
      nixpkgs,
      home-manager,
      nixos-hardware,
      ...
    }:
    let
      system = "x86_64-linux";
    in
    {
      nixosConfigurations.slumpy-laptop = nixpkgs.lib.nixosSystem {
        system = system;
        specialArgs = {
          inherit inputs;
        };
        modules = [
          home-manager.nixosModules.home-manager
          {
            home-manager.useGlobalPkgs = true;
            home-manager.useUserPackages = true;
            home-manager.users.slumpy = import ./users/slumpy.nix;
            home-manager.extraSpecialArgs = {
              inherit inputs;
            };
          }
          nixos-hardware.nixosModules.msi-gs60
          ./hosts/laptop
        ];
      };
    };
}
