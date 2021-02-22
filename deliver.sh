docker stop serviceCb
docker rm serviceCb
docker image rm serviceCb
docker build . -t serviceCb
docker run --name serviceCb --expose 3008 -p 3008:3008 -d serviceCb
