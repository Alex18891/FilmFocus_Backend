FROM node:18.14.0
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5500
CMD ["node", "app.js"]
