# Client development and build environment
FROM node:18-alpine

WORKDIR /app

COPY package.json /package.json
COPY package-lock.json /package-lock.json

RUN npm install

# Set $SHELL environment variable
ENV SHELL /bin/sh

ENV BUILD_COMMAND="watch"

CMD npm run ${BUILD_COMMAND}
