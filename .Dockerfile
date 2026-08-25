FROM node:20-bookworm

WORKDIR /app

ARG WEB_PORT=3002
ENV WEB_PORT=${WEB_PORT}
ENV CI=true

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE ${WEB_PORT}

CMD CI=1 npx expo start --web --port ${WEB_PORT}
