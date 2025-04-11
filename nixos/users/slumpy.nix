{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

{
  users.users.slumpy = {
    isNormalUser = true;
    shell = pkgs.zsh;
    ignoreShellProgramCheck = true;
    description = "Willson";
    extraGroups = [
      "wheel"
      "networkmanager"
      "input"
      "seat"
      "video"
      "jackaudio"
    ];
    hashedPassword = "$6$Rt71522o4dFiYX9V$RienW2CDtVjV3Q2u73YJ7kIrUAHJ89jb3d0R4tfNhpMsIo2hQI9GJUjmPKVJ4yleMllrQojQ7qx46G6/IhTXC1";
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILXtwwCwAQNOW6YZuMpUoOzEGmDKK5W4WQpKd21jKtvw willsonhaw@gmail.com"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJhc6E9VyPuA3SMJuU3aRJkVw/xfRlT9hECU40py7vgk slumpy@slumpy-desktop"
    ];
  };

  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    extraSpecialArgs = inputs;

    users.slumpy = {
      programs.home-manager.enable = true;

      home = {
        username = "slumpy";
        homeDirectory = "/home/slumpy";
        stateVersion = "23.11";
      };
    };
  };
}
