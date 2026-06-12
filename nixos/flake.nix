{
  description = "My Flake";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";

    home-manager = {
      url = "github:nix-community/home-manager";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland = {
      url = "git+https://github.com/hyprwm/Hyprland?submodules=1&ref=refs/tags/v0.54.2";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-contrib = {
      url = "github:hyprwm/contrib";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    hyprland-plugins = {
      url = "git+https://github.com/hyprwm/hyprland-plugins";
      inputs.hyprland.follows = "hyprland";
    };

    hy3 = {
      url = "github:outfoxxed/hy3?ref=refs/tags/hl0.54.2.1";
      inputs.hyprland.follows = "hyprland";
    };

    ags = {
      url = "github:Aylur/ags?ref=refs/tags/v3.1.2";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixpkgs-wayland = {
      url = "github:nix-community/nixpkgs-wayland";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    nixos-hardware.url = "github:NixOS/nixos-hardware/master";
    catppuccin.url = "github:catppuccin/nix";
    nix-flatpak.url = "github:gmodena/nix-flatpak";
    zen-browser.url = "github:0xc000022070/zen-browser-flake";
    vscode-server.url = "github:nix-community/nixos-vscode-server";
    
    sops-nix = {
      url = "github:Mic92/sops-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    antigravity-nix = {
      url = "github:jacopone/antigravity-nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };

    cursor-flake = {
      url = "github:omarcresp/cursor-flake";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    inputs@{
      nixpkgs,
      home-manager,
      nix-flatpak,
      ...
    }:
    let
      mkHost =
        name:
        {
          extraModules ? [ ],
        }:
        nixpkgs.lib.nixosSystem {
          system = "x86_64-linux";
          specialArgs = {
            inherit inputs;
          };
          modules = [
            home-manager.nixosModules.home-manager
            nix-flatpak.nixosModules.nix-flatpak
            ./hosts/${name}
          ]
          ++ extraModules;
        };
    in
    {
      nixosConfigurations = {
        slumpy-laptop = mkHost "laptop" {
          extraModules = [ inputs.nixos-hardware.nixosModules.msi-gs60 ];
        };

        slumpy-desktop = mkHost "desktop" { };

        slumpy-gaming = mkHost "gaming" { };

        slumpy-dev-home = mkHost "dev-home" { };

        slumpy-dev-komodo = mkHost "dev-komodo" { };

        slumpy-laptop-komodo = mkHost "laptop-komodo" { };
      };
    };
}
