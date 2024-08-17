FROM node:22-alpine

WORKDIR /user/src/app

COPY package*.json ./

RUN yarn install --omit=dev

COPY . .

RUN yarn build

CMD ["npm","run", "start:dev"]