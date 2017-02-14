FROM node:alpine
MAINTAINER Stefan Strigler <stefan@strigler.de>

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY kaiwa/package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY kaiwa /usr/src/app

RUN npm run compile

EXPOSE 8000
CMD [ "npm", "start" ]
