user_profile=$(getent passwd $SUDO_USER | cut -d: -f6)
cd $user_profile

rm -rf homehub
echo -e "\033[0;31m1. removed cloned repository.\033[0m"

rm -f .config/systemd/user/homehub.service
rm -f .config/systemd/user/homehub-react.service
echo -e "\033[0;31m2. removed systemd service files.\033[0m"

sed -i "/\[autostart\]/d" .config/wayfire.ini
sed -i "/^browser/d" .config/wayfire.ini
sed -i "/^refresher/d" .config/wayfire.ini
echo -e "\033[0;31m3. removed autostart wayfire config.\033[0m"

sed -i "/$browser_script/d" .config/labwc/autostart
echo -e "\033[0;31m4. removed autostart labwc config.\033[0m"
