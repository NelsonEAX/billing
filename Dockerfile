FROM node:12
WORKDIR /vuejs
COPY ./package.json ./
RUN npm install
RUN npm install -g http-server @vue/cli
EXPOSE 8080