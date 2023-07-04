#!/bin/bash

echo "Starting to destroy ScooTeq processes!"
container_name="scooteq"
application_name="InsaneCalculator"

# kill npm
echo "All Node.js processes are being stopped..."
killall node

# kill java
pid=$(ps aux | grep ${application_name} | grep -v grep | awk '{print $2}')

if [ -n "$pid" ]; then
  echo "Process '${application_name}' is being stopped..."
  kill $pid
else
  echo "No process found for '${application_name}'"
fi

# kill docker
echo "Stopping the docker container..."
docker stop ${container_name}
sleep 3
echo "Removing the docker container..."
docker rm ${container_name}
sleep 2

echo "Finished the destruction of ScooTeq :)"
