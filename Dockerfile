FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["node", "src/index.js"]
