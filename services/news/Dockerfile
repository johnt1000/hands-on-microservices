FROM node:11-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN [ "npm", "install" ]

COPY . .

CMD [ "npm", "start" ]

EXPOSE 8003