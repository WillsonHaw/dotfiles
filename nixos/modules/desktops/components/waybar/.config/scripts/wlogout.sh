#!/usr/bin/env bash
export PATH="/run/current-system/sw/bin:$PATH"

# Query the primary output's logical size from niri (already accounts for scale).
logical=$(niri msg outputs 2>/dev/null | grep "Logical size:" | head -1 | grep -oE '[0-9]+x[0-9]+')
if [ -n "$logical" ]; then
    IFS=x read -r log_w log_h <<< "$logical"
else
    log_w=1920
    log_h=1080
fi

# 5 square buttons with no column gap (connected pill).
n_buttons=5
target_w=850
btn_w=$(( target_w / n_buttons ))
target_h=$btn_w

margin_l=$(( (log_w - target_w) / 2 ))
margin_r=$margin_l
margin_t=$(( (log_h - target_h) / 2 ))
margin_b=$margin_t

[ $margin_l -lt 0 ] && margin_l=0
[ $margin_r -lt 0 ] && margin_r=0
[ $margin_t -lt 10 ] && margin_t=10
[ $margin_b -lt 10 ] && margin_b=10

export GTK_THEME="Adwaita:dark"
exec wlogout -b 5 -T "$margin_t" -B "$margin_b" -L "$margin_l" -R "$margin_r" -c 0 -r 0
