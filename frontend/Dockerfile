FROM ubuntu:14.04

FROM node:latest

WORKDIR /app

RUN apt-get update
RUN apt-get -y update

ADD ./new-ams-frontend/package.json /app/package.json
#
RUN npm install
#
RUN npm run prebuild:prod

COPY ./new-ams-frontend /app

RUN npm run build:prod
EXPOSE 3000
CMD ["npm", "run", "server:prod"]
