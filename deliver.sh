#!/usr/bin/env sh
set +x
kill -9 `lsof -t -i:3008`
npm start &
sleep 10
echo $! > .pidfile
set +x
