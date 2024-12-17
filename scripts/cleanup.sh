cd /srv

mv homehub/config/sites.json homehub.sites.bak
echo -e "HomeHub sites is backed up to: \033[0;32m/srv/homehub.sites.bak\033[0m"

rm -rf homehub
echo -e "\033[0;31m1. removed cloned repository.\033[0m"

sed -i "/homehub/d" /etc/rc.local
echo -e "\033[0;31m2. removed startup run command.\033[0m"

sed -i "/\[autostart\]/d" .config/wayfire.ini
sed -i "/^browser/d" .config/wayfire.ini
sed -i "/^refresher/d" .config/wayfire.ini
echo -e "\033[0;31m3. removed autostart wayfire config.\033[0m"
