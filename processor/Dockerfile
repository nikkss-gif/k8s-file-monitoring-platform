FROM node:18-alpine

WORKDIR /worker
COPY worker.js .

RUN npm install ioredis

CMD ["node", "worker.js"]
