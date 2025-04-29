FROM node:16-alpine as build-step
WORKDIR /dist/src/app
RUN npm cache clean -f

COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest as nginx
COPY --from=build-step /dist/src/app/dist/giphy-demo /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80
