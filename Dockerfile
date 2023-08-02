# ----------------------------
# build from source
# ----------------------------
FROM node:18 AS build

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

# Set a dummy environment variable to invalidate the cache
ARG CACHEBUST=1
# ----------------------------
# run with nginx
# ----------------------------
FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
COPY --from=build --chown=nginx:nginx /app/dist/string-encoder-web-ui /usr/share/nginx/html

EXPOSE 80
