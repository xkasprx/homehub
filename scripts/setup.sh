# NOTE: the sudo invoker _HAS TO BE_ same as the auto-login user
# Because we need to update that specific user's wayfire configs
# Ensure making this abundantly clear in the install instuctions
cd /srv

# Install deps (apt update already handled by nodesource script)
apt install -y git jq wtype


# Clone the HomeHub repo, or (in case it exits) pull from upstream
git clone https://github.com/xkasprx/homehub.git || git -C homehub pull

# Set up wayfire autostart config to start up browser & refresher
cd /srv
mkdir .config
cd .config
touch wayfire.ini

echo "[autostart]" >> wayfire.ini
echo "browser = /srv/homehub/scripts/browser.sh" >> wayfire.ini
echo "refresher = bash /srv/homehub/scripts/refresher.sh" >> wayfire.ini

cd /srv

# If HomeHub sites doesn't exist, try backup or use sample sites
if [ ! -f /srv/homehub/config/sites.json ]; then
    if [ -f /srv/homehub.sites.bak ]; then
        mv homehub.sites.bak homehub/config/sites.json
    else
        mv homehub/config/sites.json.sample homehub/config/sites.json
    fi
fi

cd homehub

# Install HomeHub dependencies
npm i

# Add dashboard web server to rc.local to autostart on each boot
sed -i '/^exit/d' /etc/rc.local
echo "cd /srv/homehub/ && node index.js &" >> /etc/rc.local
echo "exit 0" >> /etc/rc.local

# Also, start the server without needing to wait for next reboot
node index.js &

# Report the URL with hostname & IP address for dashboard access
echo -e "\033[0;35m\nHomeHub is now installed.\033[0m"
echo -e "Visit either of these links to access HomeHub dashboard:"
echo -e "\t- \033[0;32mhttp://$(hostname)/\033[0m or, \n\t- \033[0;32mhttp://$(hostname -I | cut -d " " -f1)/\033[0m"
echo -e "Install NVM and NodeJS to manage NodeJS versions using the following commands:"
echo -e "\t- \033[0;32mcurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash\033[0m"
echo -e "Configure link; then apply changes to reboot."
echo -e "\033[0;31mThe kiosk mode will start on next startup.\033[0m"