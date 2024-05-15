# So far I just copied basically what raspy is doing 
# but we need to "restore" our docker compose to here
# https://github.com/plexinc/pms-docker

# add plex's data folder and let valid samba users write to it
net usershare add --long share /media/eric/barrac/plex/data "" "Everyone:F" guest_ok=n

# maybe we need sonarr?
# https://sonarr.tv/#downloads-docker
