#!/bin/bash

# Get user profile information securely
user_profile=$(getent passwd $SUDO_USER | cut -d: -f6)

# Welcome message
echo -e "\033[0;35m\nHomeHub setup\033[0m"
echo -e "Hello, $SUDO_USER! This script will install HomeHub on your system."
echo -e "Please make sure you have an active internet connection before proceeding.\n"

# Check root privileges
if [ "$EUID" -ne 0 ]; then
  echo -e "\033[0;31mThis script must be run as root. Please run it with sudo.\033[0m"
  exit 1
fi

# Install dependencies
echo Installing APT dependencies
install_package() {
  local package_name="$1"
  if ! command -v "$package_name" &> /dev/null; then
    echo "Installing $package_name..."
    sudo apt install -y "$package_name"
  else
    echo "$package_name is already installed."
  fi
}

# Install required packages
install_package jq
install_package wtype
install_package git
install_package wayland-protocols
install_package wayfire
install_package chromium-browser

# Check if Node.js is installed, if not, install it
if ! command -v node &> /dev/null
then
  latest_version=$(curl -L https://api.github.com/repos/nvm-sh/nvm/releases/latest | jq -r '.tag_name')

  echo "Node.js could not be found, installing NVM Version $latest_version"

  # Install NVM and Node.js
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/$latest_version/install.sh | bash -

  # Source NVM to use it in this script
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

  # Install the latest LTS version of Node.js
  echo "Installing Node.js LTS version"
  nvm install node
else
  echo "Node.js is already installed"
fi

# Install serve package to serve the React app
if ! command -v serve &> /dev/null
then
  echo "Installing serve package"
  npm i -g serve
else
  echo "serve package is already installed"
fi

# Install PM2 to manage the Node.js process
if ! command -v pm2 &> /dev/null
then
  echo "Installing PM2"
  npm i -g pm2
else
  echo "PM2 is already installed"
fi

# Clone HomeHub repository (using shallow clone)
git clone --depth=1 -c core.autocrlf=input https://github.com/xkasprx/homehub.git "$user_profile/homehub"

# Set up wayfire autostart config to start up browser & refresher
cd $user_profile

# Directories to create (if not existing)
config_dirs=(
  ".config/wayfire"
  ".config/labwc"
)

# Files to create (if not existing)
config_files=(
  ".config/wayfire.ini"
  ".config/labwc/autostart"
)

# Browser script path (replace with actual path if needed)
browser_script="$user_profile/homehub/scripts/browser.sh"

# Function to check and create directory
create_dir() {
  local dir_path="$1"
  if [ ! -d "$dir_path" ]; then
    echo "Creating directory: $dir_path"
    sudo mkdir -p "$dir_path"
  fi
}

# Function to check and create file
create_file() {
  local file_path="$1"
  if [ ! -f "$file_path" ]; then
    echo "Creating file: $file_path"
    touch "$file_path"
  fi
}

# Create necessary directories
for dir in "${config_dirs[@]}"; do
  create_dir "$dir"
done

# Create necessary files
for file in "${config_files[@]}"; do
  create_file "$file"
done

# Configure Wayfire autostart
echo "Setting up Wayfire autostart config"
echo "[autostart]" >> ".config/wayfire.ini"
echo "browser = $browser_script" >> ".config/wayfire.ini"

# Configure labwc autostart
echo "Setting up labwc autostart config"
echo "$browser_script" > ".config/labwc/autostart"

cd $user_profile/homehub

# Install HomeHub dependencies
echo Installing HomeHub dependencies
npm i

# Remove unneeded files
cd react
rm -r public
rm -r src
rm package.json

# Add dashboard web server to rc.local to autostart on each boot
echo Setting up HomeHub to start on boot
if [ ! -f /etc/rc.local ]; then
    echo "#!/bin/sh -e" | sudo tee /etc/rc.local > /dev/null
    echo "exit 0" | sudo tee -a /etc/rc.local > /dev/null
fi
sed -i '/^exit/d' /etc/rc.local
echo "cd $user_profile/homehub/react && pm2 start ecosystem.config.js &" | sudo tee -a /etc/rc.local > /dev/null
echo "cd $user_profile/homehub/ && pm2 start ecosystem.config.js &" | sudo tee -a /etc/rc.local > /dev/null
echo "exit 0" | sudo tee -a /etc/rc.local > /dev/null

# Ensure rc.local is executable
sudo chmod +x /etc/rc.local

# Start the HomeHub server
echo "Starting HomeHub server"
sudo -u $SUDO_USER pm2 start $user_profile/homehub/ecosystem.config.js
sudo -u $SUDO_USER pm2 start $user_profile/homehub/ecosystem.config.js


# Report the URL with hostname & IP address for dashboard access
echo -e "\033[0;35m\nHomeHub is now installed.\033[0m"
echo -e "Visit either of these links to access HomeHub dashboard:"
echo -e "\t- \033[0;32mhttp://$(hostname)/\033[0m or, \n\t- \033[0;32mhttp://$(hostname -I | cut -d " " -f1)/\033[0m"
echo -e "\033[0;31mThe kiosk mode will start on next startup.\033[0m"