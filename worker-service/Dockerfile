FROM node:22.5.1-alpine3.20

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

CMD ["node", "dist/main.js"]
