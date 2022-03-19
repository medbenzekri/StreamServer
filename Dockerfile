FROM jrottenberg/ffmpeg:3.3-alpine
FROM node:current-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm i
RUN apk update
RUN apk add 
RUN apk add ffmpeg
COPY . .

EXPOSE 3000
CMD npm start