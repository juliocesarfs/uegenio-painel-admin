FROM nginx:latest
COPY . /usr/share/nginx/html
COPY nginx.conf /etc/nginx/
EXPOSE $PORT
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf" && nginx -g 'daemon off;'
