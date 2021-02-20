FROM node:12-alpine
WORKDIR /src
COPY . .
RUN npm i
CMD [ "npm", "run", "pm2"]