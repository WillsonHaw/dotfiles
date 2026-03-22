# Disk - NTFS filesystem support for mounting Windows partitions.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  boot.supportedFilesystems = [ "ntfs" ];
}
