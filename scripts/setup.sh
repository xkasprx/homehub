# NOTE: the sudo invoker _HAS TO BE_ same as the auto-login user
# Because we need to update that specific user's wayfire configs
# Ensure making this abundantly clear in the install instuctions
SITE=$(cat /etc/passwd | grep /$SUDO_USER: | cut -f6 -d:)
cd $SITE

[ $(which node) ] || curl -fsSL https://deb.nodesource.com/setup_20.x | bash -

# Install deps (apt update already handled by nodesource script)
apt install -y git jq nodejs wtype

# Clone the HomeHub repo, or (in case it exits) pull from upstream
git clone https://github.com/xkasprx/homehub.git || git -C homehub pull

# Set up wayfire autostart config to start up browser & refresher
echo "[autostart]" >> $SITE/.config/wayfire.ini
echo "browser = $SITE/homehub/scripts/browser.sh" >> $SITE/.config/wayfire.ini
echo "refresher = bash $SITE/homehub/scripts/refresher.sh" >> $SITE/.config/wayfire.ini

# If HomeHub sites doesn't exist, try backup or use sample sites
if [ ! -f $SITE/homehub/config/sites.json ]; then
    if [ -f $SITE/homehub.sites.bak ]; then
        mv homehub.sites.bak homehub/config/sites.json
    else
        mv homehub/config/sites.json.sample homehub/config/sites.json
    fi
fi

# Not necessary to change directory; npm does take --prefix path
cd $SITE/homehub
# This either goes in active development, or stays as is forever
# In either of the cases, `npm ci` is less suitable than `npm i`
npm i

# Add dashboard web server to rc.local to autostart on each boot
sed -i '/^exit/d' /etc/rc.local
echo "cd $SITE/homehub/ && node index.js &" >> /etc/rc.local
echo "exit 0" >> /etc/rc.local

# Also, start the server without needing to wait for next reboot
node index.js &

# Report the URL with hostname & IP address for dashboard access
echo -e "\033[0;35m\nHomeHub is now installed.\033[0m"
echo -e "Visit either of these links to access HomeHub dashboard:"
echo -e "\t- \033[0;32mhttp://$(hostname)/\033[0m or, \n\t- \033[0;32mhttp://$(hostname -I | cut -d " " -f1)/\033[0m"
echo -e "Configure links to shuffle; then apply changes to reboot."
echo -e "\033[0;31mThe kiosk mode will start on next startup.\033[0m"
