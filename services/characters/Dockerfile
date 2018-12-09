FROM node:11-alpine

WORKDIR /app

# RUN [ "apk", "add", "curl" ]
# RUN [ "npm", "install", "--unsafe-perm", "-g", "ngrok" ]

COPY ./package.json ./package-lock.json ./
RUN [ "npm", "install" ]

COPY . .

CMD ["sh", "run", "8000"]

EXPOSE 8000