# ----------------------------
# build from source
# ----------------------------
FROM node:latest AS build
WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build
# Set a dummy environment variable to invalidate the cache
# ----------------------------
# run with nginx
# ----------------------------
FROM nginx:latest

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build --chown=nginx:nginx /app/dist/string-encoder-web-ui /usr/share/nginx/html
COPY .htpasswd /etc/nginx/.htpasswd

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
