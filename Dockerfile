FROM node:8-alpine

RUN apk update \
 && apk add curl bash binutils tar \
 && rm -rf /var/cache/apk/* \
 && /bin/bash \
 && touch ~/.bashrc \
 && curl -o- -L https://yarnpkg.com/install.sh | bash \
 && apk del curl tar binutils

RUN apk add --update git

RUN mkdir -p /app/client
RUN mkdir -p /app

WORKDIR /app/client

COPY client/package.json ./
COPY client/yarn.lock ./
RUN yarn install

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./
RUN yarn install

COPY ./ ./

WORKDIR /app/client
#COPY ./client ./
RUN yarn run build

RUN rm -rf /app/client


WORKDIR /app


CMD ["node", "."]



