#!/usr/bin/env sh
set +x
npm start &
sleep 10
echo $! > cat.pidfile
set +x
