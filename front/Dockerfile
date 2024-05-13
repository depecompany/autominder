FROM node:21-alpine

WORKDIR /app-ui

COPY package*.json ./

RUN npm install -g npm@10.6.0

RUN npm install -g expo-cli

RUN npm install

COPY . .

EXPOSE 8081

CMD [ "npx", "expo", "start" ]