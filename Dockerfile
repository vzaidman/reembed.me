FROM node:8.1.3-alpine

RUN apk update \
 && apk add curl bash binutils tar \
 && rm -rf /var/cache/apk/* \
 && /bin/bash \
 && touch ~/.bashrc \
 && curl -o- -L https://yarnpkg.com/install.sh | bash \
 && apk del curl tar binutils

RUN apk add --update git

RUN mkdir -p /app/client
WORKDIR /app/client
COPY client/package.json ./
COPY client/yarn.lock ./
RUN yarn install

WORKDIR /app
COPY server/package.json ./
COPY server/yarn.lock ./
RUN yarn install

WORKDIR /app
COPY server ./

WORKDIR /app/client
COPY client ./
RUN NODE_ENV=production BUILD_PATH="$PWD/../client-dist" yarn run build

WORKDIR /
RUN rm -rf /app/client

WORKDIR /app
CMD ["node", "."]



