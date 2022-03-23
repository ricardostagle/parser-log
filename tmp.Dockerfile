FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "parser-log"]

CMD ["npm", "start"]