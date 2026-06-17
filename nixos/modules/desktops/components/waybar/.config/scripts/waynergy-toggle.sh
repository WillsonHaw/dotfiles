#!/usr/bin/env bash
export PATH="/run/current-system/sw/bin:$PATH"
if pgrep -x waynergy > /dev/null; then
  pkill -x waynergy
  notify-send "waynergy" "Stopped"
else
  nohup waynergy >/dev/null 2>&1 &
  notify-send "waynergy" "Started"
fi
