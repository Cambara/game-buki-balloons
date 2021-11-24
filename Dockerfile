
FROM node:14 as ui-build
ARG PORT
WORKDIR /app
COPY . /app/

RUN npm install
RUN npm run build

FROM nginx

WORKDIR /app

COPY --from=ui-build /app/dist /usr/share/nginx/html
COPY --from=ui-build /app/nginx.conf /etc/nginx/conf.d/default.conf

CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

#EXPOSE 80
#EXPOSE 443