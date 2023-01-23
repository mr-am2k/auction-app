
FROM node:16 as build

WORKDIR /opt/app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

RUN npm run build

ENV NODE_ENV production

EXPOSE 3000

CMD ["npm", "start"]