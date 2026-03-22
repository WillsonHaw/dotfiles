# curl - Command-line tool for transferring data via URLs.
{
  config,
  lib,
  pkgs,
  ...
}:

{
  environment.systemPackages = with pkgs; [ curl ];
}
