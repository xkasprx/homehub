export XDG_RUNTIME_DIR=/run/user/1000

# Refresh the screen every minute
while true; do
  wtype -M ctrl r
  sleep 60
done
