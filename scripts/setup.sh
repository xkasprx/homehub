USERPROFILE=$(cat /etc/passwd | grep /$SUDO_USER: | cut -f6 -d:)
cd /srv

# Install deps (apt update already handled by nodesource script)
apt install -y git jq wtype

# Check if Node.js is installed, if not, install it
if ! command -v node &> /dev/null
then
	echo "Node.js could not be found, installing..."
	curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash -
else
	echo "Node.js is already installed"
fi

# Clone the HomeHub repo, or (in case it exits) pull from upstream
git clone https://github.com/xkasprx/homehub.git || git -C homehub pull

# Set up wayfire autostart config to start up browser & refresher
cd $USERPROFILE
mkdir .config
touch .config/wayfire.ini

echo "[autostart]" >> .config/wayfire.ini
echo "browser = /srv/homehub/scripts/browser.sh" >> .config/wayfire.ini
echo "refresher = bash /srv/homehub/scripts/refresher.sh" >> .config/wayfire.ini

cd /srv/homehub

# Install HomeHub dependencies
npm i

# Add dashboard web server to rc.local to autostart on each boot
sed -i '/^exit/d' /etc/rc.local
echo "cd /srv/homehub/ && node app.js &" >> /etc/rc.local
echo "exit 0" >> /etc/rc.local

# Also, start the server without needing to wait for next reboot
node index.js &

# Report the URL with hostname & IP address for dashboard access
echo -e "\033[0;35m\nHomeHub is now installed.\033[0m"
echo -e "Visit either of these links to access HomeHub dashboard:"
echo -e "\t- \033[0;32mhttp://$(hostname)/\033[0m or, \n\t- \033[0;32mhttp://$(hostname -I | cut -d " " -f1)/\033[0m"
echo -e "Configure link; then apply changes to reboot."
echo -e "\033[0;31mThe kiosk mode will start on next startup.\033[0m"