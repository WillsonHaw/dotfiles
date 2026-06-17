#!/usr/bin/env bash
export PATH="/run/current-system/sw/bin:$PATH"
if pgrep -x waynergy > /dev/null; then
  printf '{"text":" ","class":"running","tooltip":"waynergy: running"}\n'
else
  printf '{"text":" ","class":"stopped","tooltip":"waynergy: stopped"}\n'
fi
