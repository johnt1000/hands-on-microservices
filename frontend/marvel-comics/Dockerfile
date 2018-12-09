FROM jonatasra/vue-cli

WORKDIR /app

COPY ./package.json ./package-lock.json ./
RUN [ "npm", "install" ]

COPY . .

CMD ["npm", "run", "serve"]

EXPOSE 3000