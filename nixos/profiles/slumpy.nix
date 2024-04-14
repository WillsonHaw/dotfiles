{ config, lib, pkgs, ... }:

{
  users.users.slumpy = {
    isNormalUser = true;
    shell = pkgs.zsh;
    ignoreShellProgramCheck = true;
    description = "Willson";
    extraGroups = [ "wheel" "networkmanager" ];
    hashedPassword = "$6$Rt71522o4dFiYX9V$RienW2CDtVjV3Q2u73YJ7kIrUAHJ89jb3d0R4tfNhpMsIo2hQI9GJUjmPKVJ4yleMllrQojQ7qx46G6/IhTXC1";
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILXtwwCwAQNOW6YZuMpUoOzEGmDKK5W4WQpKd21jKtvw willsonhaw@gmail.com"
    ];
  };
}
