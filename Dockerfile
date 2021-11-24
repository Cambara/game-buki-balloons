
FROM node:14 as ui-build
WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

FROM nginx

WORKDIR /app

COPY --from=ui-build /app/dist /usr/share/nginx/html

EXPOSE 80
EXPOSE 443