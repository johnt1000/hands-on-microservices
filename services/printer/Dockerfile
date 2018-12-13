FROM node:11-alpine

RUN [ "apk", "add", "curl" ]
RUN [ "npm", "install", "-g", "concurrently" ]

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN [ "npm", "install" ]

COPY . .

CMD ["sh", "run.sh"]

EXPOSE 8002