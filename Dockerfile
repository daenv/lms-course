FROM node:alpine 

WORKDIR /app

COPY package.json ./
COPY yarn.lock ./

RUN npm install
RUN yarn

COPY . .

CMD ["yarn","run","dev"]