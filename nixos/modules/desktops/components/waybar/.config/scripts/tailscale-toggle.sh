#!/usr/bin/env bash
export PATH="/run/current-system/sw/bin:$PATH"

ip_addr=$(ip -4 addr show dev tailscale0 2>/dev/null | grep -o 'inet [0-9.]*' | cut -d' ' -f2)

if [ -n "$ip_addr" ]; then
  tailscale down
  notify-send "Tailscale" "Disconnected"
else
  tailscale up --accept-routes
  new_ip=$(ip -4 addr show dev tailscale0 2>/dev/null | grep -o 'inet [0-9.]*' | cut -d' ' -f2)
  notify-send "Tailscale" "Connected: ${new_ip}"
fi
