FROM node:11-alpine

WORKDIR /app

RUN [ "apk", "add", "curl" ]
# RUN [ "npm", "install", "--unsafe-perm", "-g", "ngrok" ]

COPY ./package.json ./package-lock.json ./
RUN [ "npm", "install" ]

COPY . .

CMD [ "sh", "run.sh" ]

EXPOSE 8000