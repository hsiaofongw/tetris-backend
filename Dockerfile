# syntax=docker/dockerfile:1

# 设置基镜像
FROM node:latest as base

# 设置工作目录
WORKDIR /app
COPY [ "package.json", "package-lock.json*", "./" ]

# 定义 test 目标
FROM base as test
ENV NODE_ENV=dev
RUN npm ci
RUN npm ls
COPY . .
RUN npm run test

# 定义 production 目标
FROM base as production
ENV NODE_ENV=production
RUN npm ci
RUN npm ls
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
CMD [ "node", "dist/main.js" ]
