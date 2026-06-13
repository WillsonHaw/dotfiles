#!/usr/bin/env bash
export PATH="/run/current-system/sw/bin:$PATH"
ip=$(ip -4 addr show dev tailscale0 2>/dev/null | grep -o 'inet [0-9.]*' | cut -d' ' -f2)
if [ -n "$ip" ]; then
  printf '{"text":" ","class":"connected","tooltip":"Tailscale: %s"}\n' "$ip"
else
  printf '{"text":" ","class":"disconnected","tooltip":"Tailscale: disconnected"}\n'
fi
