kill -9 `sudo lsof -t -i:3008`
npm start &
sleep 10
echo $! > .pidfile
set +x
