#!/bin/bash

echo "Starting the ScooTeq script..."
container_name="scooteq"

# check if daemon is running
if docker info >/dev/null 2>&1; then
  echo "Docker daemon is running."
else
  echo "Docker daemon is not running."
fi

# check if container exists
container_id=$(docker ps -aqf "name=${container_name}")
if [[ -n "$container_id" ]]; then
  # check if container is running
  if docker ps | grep -q "$container_name"; then
    echo "Container '$container_name' is already running."
  else
    docker start "$container_name"
    sleep 3
    echo "Container '$container_name' has been started."
  fi
else
  echo "Container '$container_name' does not exist."
  docker run --name scooteq -e POSTGRES_PASSWORD=123 -d -p 5432:5432 postgres:alpine
  echo "Container '$container_name' is being build..."
  sleep 10
  echo "..."
  sleep 10
  echo "Container '$container_name' has been created"
fi

# add fresh db
docker exec -it "$container_name" psql -U postgres -c "DROP DATABASE IF EXISTS $container_name;"
docker exec -it "$container_name" psql -U postgres -c "CREATE DATABASE $container_name;"

# build jar file and execute
./gradlew build
echo "Starting backend..."
nohup java -jar build/libs/InsaneCalculator-1.0.jar >/dev/null 2>&1 &
sleep 3
echo "..."
sleep 3
echo "Backend started!"

# add sample data
docker cp src/main/resources/static/sampledata.sql scooteq:/tmp/sampledata.sql
docker exec -it "$container_name" psql -U postgres -d "$container_name" -f /tmp/sampledata.sql

# start frontend
echo "Starting frontend..."
cd frontend-scooteq
npm start >/dev/null 2>&1 &
cd ..
sleep 2
echo "Frontend started! Visit http://localhost:3000/login"
open 'http://localhost:3000/login'

echo "Finished the ScooTeq script"
