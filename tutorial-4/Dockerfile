FROM node:18.4-alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json .
RUN npm install
# RUN npm install -g create-react-app

COPY . ./