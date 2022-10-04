FROM node:lts
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN yarn install
COPY ./ ./
RUN yarn build
EXPOSE 8080
CMD [ "yarn", "start:prod" ]