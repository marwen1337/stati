FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:service && npm run build:agent

FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=build /app/dist /app/dist
COPY --from=build /app/package*.json /app/

ENV PORT=8080

EXPOSE ${PORT}

CMD if [ "$MODE" = "agent" ]; then npm run start:agent:prod; else npm run start:service:prod; fi
