FROM node:16

WORKDIR /opt/app

COPY ./package.json .

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]