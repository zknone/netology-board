FROM node:20.10-alpine

WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY ./app ./app

CMD ["npm", "run", "server"]
