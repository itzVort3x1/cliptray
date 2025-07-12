#!/usr/bin/env bash
# seed-clipboard.sh
#
# Generates 20 random alphanumeric strings and copies each to the clipboard,
# one per second, so your Electron tray app picks them up.

# Choose your clipboard tool: xclip or xsel
if command -v xclip &> /dev/null; then
  CLIP_CMD="xclip -selection clipboard"
elif command -v xsel &> /dev/null; then
  CLIP_CMD="xsel --clipboard --input"
else
  echo "Error: install xclip or xsel to manipulate the clipboard." >&2
  exit 1
fi

for i in $(seq 1 20); do
  # generate a 12-char random alphanumeric string
  STR=$(head -c 9 /dev/urandom | base64 | tr -dc 'A-Za-z0-9' | head -c 12)
  # copy it into the clipboard
  printf "%s" "$STR" | eval $CLIP_CMD
  echo "Copied to clipboard: $STR"
  sleep 1
done
