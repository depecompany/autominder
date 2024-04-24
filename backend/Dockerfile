FROM node:21-alpine

WORKDIR /admin

COPY package*.json ./

RUN npm install typescript -g && npm install ts-node -g
RUN npm install

EXPOSE 4201

CMD ["npm", "run", "dev"]
