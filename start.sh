#!/bin/bash

kill $(lsof -t -i:8080)
kill $(lsof -t -i:3000)

cd Server
xterm -e mvn spring-boot:run &
cd ..

sleep 6s

cd Client/app
xterm -e npm run start &
cd ../..
