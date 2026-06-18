# Display - Kanshi dynamic display configuration daemon for Wayland.
#
# Profiles are auto-generated from noodles.system.display.externalDisplays:
#
#   For each external display D:
#     "ext-N-only"   — D at (0,0); matches when ONLY D is connected (lid closed).
#     "ext-N-docked" — D at (0,0) + internal alongside; matches when BOTH are
#                      connected. Internal is disabled if disableInternal = true
#                      (XR glasses), otherwise positioned to D's right.
#   "undocked"       — internal at (0,0); matches when no external is present.
#
# Kanshi selects the most specific matching profile (most outputs listed), so
# the docked profile always wins over the external-only profile when both
# displays are connected.
{
  config,
  lib,
  pkgs,
  ...
}:
let
  # Extract physical pixel width from a mode string like "1920x1080" or "1920x1080@60".
  modeToWidth = mode: lib.toInt (builtins.head (lib.splitString "x" mode));

  mkExternalOutput = ext: {
    criteria = ext.criteria;
    status = "enable";
    position = "0,0";
    mode = ext.mode;
    scale = ext.scale;
  };

  mkExtOnlyProfile = exec: i: ext: {
    profile = {
      name = "ext-${toString i}-only";
      outputs = [ (mkExternalOutput ext) ];
      inherit exec;
    };
  };

  mkDockedProfile = exec: internalCriteria: i: ext:
    let
      width =
        if ext.logicalWidth != null then ext.logicalWidth
        else if ext.mode != null then modeToWidth ext.mode
        else null;
    in
    lib.optional (width != null) {
      profile = {
        name = "ext-${toString i}-docked";
        outputs = [
          (mkExternalOutput ext)
          {
            criteria = internalCriteria;
            status = if ext.disableInternal then "disable" else "enable";
            position = if ext.disableInternal then null else "${toString width},0";
          }
        ];
        inherit exec;
      };
    };
in
{
  options.noodles.system.display = {
    enable = lib.mkEnableOption "dynamic display management via kanshi";

    internalDisplay = lib.mkOption {
      type = lib.types.str;
      default = "eDP-1";
      description = "Kanshi criteria for the built-in laptop display.";
    };

    externalDisplays = lib.mkOption {
      type = lib.types.listOf (lib.types.submodule {
        options = {
          criteria = lib.mkOption {
            type = lib.types.str;
            description = ''
              Kanshi output criteria — the display's make/model string
              (preferred; survives connector changes) or a connector name
              like "DP-1".  Run `niri msg outputs` or `wlr-randr` to find
              the make/model string.
            '';
          };
          mode = lib.mkOption {
            type = lib.types.nullOr lib.types.str;
            default = null;
            description = ''
              Force a specific output mode, e.g. "1920x1080" or "1920x1080@60".
              Null uses the display's preferred mode.  When set, logicalWidth
              is auto-derived from the width component (assumes scale 1).
            '';
          };
          scale = lib.mkOption {
            type = lib.types.nullOr lib.types.float;
            default = null;
            description = "Output scale override. Null keeps the display default (usually 1).";
          };
          logicalWidth = lib.mkOption {
            type = lib.types.nullOr lib.types.int;
            default = null;
            description = ''
              Logical pixel width (physical width ÷ scale) of this display.
              Used to position the internal display in the docked profile.
              Auto-derived from mode at scale 1 when not set; must be set
              explicitly when mode is null or scale != 1.
            '';
          };
          disableInternal = lib.mkOption {
            type = lib.types.bool;
            default = false;
            description = ''
              Disable the internal display when this external display is
              connected alongside it.  Use for XR glasses and similar
              displays that replace the laptop screen rather than extending it.
            '';
          };
        };
      });
      default = [];
      description = "External displays to manage with kanshi.";
    };

    profileChangeExec = lib.mkOption {
      type = lib.types.listOf lib.types.str;
      default = [];
      description = ''
        Shell commands appended to every kanshi profile's exec list.
        Other modules (e.g. waynergy) inject their restart commands here
        rather than having the display module depend on them directly.
      '';
    };
  };

  config =
    let
      cfg = config.noodles.system.display;

      profiles =
        lib.concatLists (lib.imap0 (i: ext:
          [ (mkExtOnlyProfile cfg.profileChangeExec i ext) ]
          ++ (mkDockedProfile cfg.profileChangeExec cfg.internalDisplay i ext)
        ) cfg.externalDisplays)
        ++ [{
          profile = {
            name = "undocked";
            outputs = [{
              criteria = cfg.internalDisplay;
              status = "enable";
              position = "0,0";
            }];
            exec = cfg.profileChangeExec;
          };
        }];
    in
    lib.mkIf cfg.enable {
      home-manager.users.${config.noodles.user} = {
        services.kanshi = {
          enable = true;
          systemdTarget = "graphical-session.target";
          settings = profiles;
        };
      };
    };
}
