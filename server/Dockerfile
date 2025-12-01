FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --network-timeout=100000

COPY . .

RUN npm run build

EXPOSE 4040

CMD ["node", "dist/src/main.js"]
