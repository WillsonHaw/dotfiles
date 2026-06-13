#!/usr/bin/env bash
if ! command -v tailscale &>/dev/null; then
  exit 0
fi

if ip=$(tailscale ip -4 2>/dev/null) && [ -n "$ip" ]; then
  printf '{"text":"󰖟","class":"connected","tooltip":"Tailscale: %s"}\n' "$ip"
else
  printf '{"text":"󰖪","class":"disconnected","tooltip":"Tailscale: disconnected"}\n'
fi
