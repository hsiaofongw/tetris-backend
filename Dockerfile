# syntax=docker/dockerfile:1

# 设置基镜像
FROM node:latest as base

# 设置工作目录
WORKDIR /app
COPY [ "package.json", "package-lock.json*", "./" ]

# 定义 test 目标
FROM base as test
RUN npm ci
COPY . .
ENV NODE_ENV=dev
RUN npm run test

# 定义 production 目标
FROM base as production
RUN npm ci
COPY . .
RUN npm run build
ENV NODE_ENV=production
CMD [ "node", "dist/main.js" ]
