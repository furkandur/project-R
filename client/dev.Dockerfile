FROM node:23.11.0-bullseye-slim

WORKDIR /usr/src/app

USER node

COPY --chown=node:node . .

ENV NODE_ENV=development

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]