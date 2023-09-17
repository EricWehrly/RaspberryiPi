sudo apt-get update -y && sudo apt-get upgrade -y

curl -sSL https://get.docker.com/ | sudo sh
sudo apt-get install -y steamlink

# TODO: Export current PWD as environment variable for use in other scripts

# GPIO reader? (can probably just use HomeAssistant but ...)
# wget https://project-downloads.drogon.net/wiringpi-latest.deb
# sudo dpkg -i wiringpi-latest.deb

cp scripts/docker-compose.sh /usr/local/bin/docker-compose
cp scripts/docker-startup.sh /etc/init.d/docker-startup
cp docker-compose.yml /etc/

chmod 755 /etc/init.d/docker-startup
update-rc.d docker-startup defaults

# Apparently there were some problems with IPV6 getting routed,
# may need to apply this fix for apt
# https://raspberrypi.stackexchange.com/a/55951

# RetroPie? 
# https://retropie.org.uk/docs/Manual-Installation/
