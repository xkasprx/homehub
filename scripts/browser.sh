chromium-browser \
  $(jq -r '.site' ~/homehub/config/settings.json) \
  --kiosk \
  --fast \
  --fast-start \
  --no-first-run \
  --noerrdialogs \
  --disable-infobars \
  --ozone-platform=wayland \
  --enable-features=OverlayScrollbar \
  --enable-accelerated-video-decode \
  --enable-gpu-rasterization \
  --enable-oop-rasterization \
  --ignore-gpu-blocklist \
  --disable-smooth-scrolling \
  --disable-low-res-tiling \
  --enable-low-end-device-mode \
  --disable-composited-antialiasing \
  --start-maximized