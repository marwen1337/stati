FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:service && npm run build:agent

ENV PORT=8080
ENV NODE_ENV=production

EXPOSE ${PORT}

CMD if [ "$MODE" = "agent" ]; then npm run start:agent:prod; else npm run start:service:prod; fi
