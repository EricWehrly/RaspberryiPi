#!/bin/bash

# TODO: Proper start / stop
# https://www.stuffaboutcode.com/2012/06/raspberry-pi-run-program-at-start-up.html

cd /home/pi/docker
rm -f docker-compose.log
docker-compose pull
docker-compose up > docker-compose.log
