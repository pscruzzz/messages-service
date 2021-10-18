FROM node:14-alpine

WORKDIR '/app/messages'

COPY ./package.json ./

RUN "yarn"

COPY . .

EXPOSE 3000

ENTRYPOINT [ "yarn", "dev" ]