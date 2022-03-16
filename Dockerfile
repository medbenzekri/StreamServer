FROM jrottenberg/ffmpeg:3.3-alpine
FROM node:16-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
COPY --from=0 / /
COPY . .

EXPOSE 3000

CMD npm start