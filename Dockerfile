FROM node:22-bookworm-slim

WORKDIR /app

ENV NODE_ENV=development

COPY server/package*.json ./server/

RUN cd server && npm install

COPY game ./game
COPY server ./server

WORKDIR /app/server

EXPOSE 55555

CMD ["npm", "run", "dev"]

