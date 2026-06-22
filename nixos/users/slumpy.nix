{
  config,
  lib,
  pkgs,
  inputs,
  ...
}:

let
  user = config.noodles.user;
in
{
  users.users.${user} = {
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
    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAILXtwwCwAQNOW6YZuMpUoOzEGmDKK5W4WQpKd21jKtvw willsonhaw@gmail.com"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJhc6E9VyPuA3SMJuU3aRJkVw/xfRlT9hECU40py7vgk slumpy@slumpy-desktop"
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIE1WXDv8fc5OwenVI+910X6xJUBcl/HLqIDVqL44Ghsl willsonhaw@gmail.com" # Gaming Desktop
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJYSW/qZVvdPLji9Qj1hNiAFXMGJzXO/jxdSMCjaA/TA slumpy@nixos" # MSI Laptop
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIEnb/W7JQQQBQAZTE5rd1ykW7TpDpGYozUL3PDKdLbRD willsonhaw@gmail.com (slumpy-dev-komodo)" # Komodo VM
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJ5jX5IBdc96J4urpzdvaztjy92rcmTT/FEz9pOmYPjl willsonhaw@gmail.com (slumpy-laptop-komodo)" # Komodo Laptop
    ];
  };

  # On a fresh machine with no SOPS key, the secret file won't exist and the
  # service no-ops, leaving the account locked (SSH via authorized keys still works).
  # After SOPS is set up and the system is rebuilt, this applies the password.
  systemd.services."sops-apply-user-password" = {
    description = "Apply user password from SOPS secret";
    wantedBy = [ "multi-user.target" ];
    after = [ "local-fs.target" ];
    serviceConfig = {
      Type = "oneshot";
      RemainAfterExit = true;
      ExecStart = pkgs.writeShellScript "apply-user-password" ''
        if [ -f "${config.sops.secrets.hashed_host_pw.path}" ]; then
          printf '%s:%s\n' "${user}" "$(cat ${config.sops.secrets.hashed_host_pw.path})" | \
            ${pkgs.shadow}/bin/chpasswd -e
        fi
      '';
    };
  };

  home-manager = {
    useGlobalPkgs = true;
    useUserPackages = true;
    extraSpecialArgs = { inherit inputs; };

    users.${user} = {
      programs.home-manager.enable = true;

      home = {
        username = user;
        homeDirectory = "/home/${user}";
        stateVersion = "23.11";
      };
    };
  };
}
