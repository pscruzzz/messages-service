FROM node:14-alpine

WORKDIR '/app/messages-consumer'

COPY ./package.json ./

RUN "yarn"

COPY . .

EXPOSE 3333

ENTRYPOINT [ "yarn", "dev" ]