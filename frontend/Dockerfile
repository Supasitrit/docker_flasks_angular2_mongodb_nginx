# FROM ubuntu:14.04

FROM node:latest

WORKDIR /app

# RUN apt-get update
# RUN apt-get -y update

ADD ./frontend/package.json /app/package.json
#
RUN npm install
#
# Production
RUN npm run prebuild:prod

COPY ./frontend /app

RUN npm run build:prod

EXPOSE 3000
CMD ["npm", "run", "server:prod"]

# Development
# RUN npm run prebuild:dev
#
# COPY ./frontend /app
#
# RUN npm run build:dev
#
# EXPOSE 3000
# CMD ["npm", "run", "server:dev"]
