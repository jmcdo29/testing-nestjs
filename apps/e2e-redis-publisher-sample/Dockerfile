FROM node:12-stretch

USER node

RUN mkdir /home/node/code

WORKDIR /home/node/code

COPY --chown=node:node package.json package-lock.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build e2e-redis-publisher-sample

CMD ["node", "dist/apps/e2e-redis-publisher-sample/main.js"]
