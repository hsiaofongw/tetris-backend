# syntax=docker/dockerfile:1

FROM node:latest

ENV NODE_ENV=production

WORKDIR /app

COPY [ "package.json", "package-lock.json*", "./" ]

RUN npm install
RUN npm install -g @nestjs/cli

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]
