FROM node:18.16.0-alpine3.17
WORKDIR /
COPY package.json .
COPY package-lock.json .
COPY . .
RUN npm ci
EXPOSE 8080
CMD [ "npm", "run", "dev"]