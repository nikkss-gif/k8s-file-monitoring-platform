FROM node:18-alpine

WORKDIR /app
COPY app.js .

RUN npm install express ioredis

EXPOSE 3000
CMD ["node", "app.js"]
