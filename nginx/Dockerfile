FROM ubuntu:14.04

# get the nginx package and set it up
RUN ["apt-get", "update"]
RUN ["apt-get", "-y", "install", "nginx"]

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log
VOLUME ["/var/cache/nginx"]
EXPOSE 80 443

# load nginx conf
# ADD ./site.conf /etc/nginx/sites-available/correspondence
# RUN ["ln", "-s", "/etc/nginx/sites-available/correspondence", "/etc/nginx/sites-enabled/correspondence"]

RUN ["rm", "-rf", "/etc/nginx/nginx.conf"]
COPY ./nginx/nginx.conf /etc/nginx/

# RUN ["rm", "-rf", "/etc/nginx/sites-enabled/default"]
# COPY ./nginx/sites-enabled/default /etc/nginx/sites-enabled/

# RUN ["rm", "-rf", "/etc/nginx/sites-available/default"]
# COPY ./nginx/sites-available/default /etc/nginx/sites-available/
#
CMD ["nginx", "-g", "daemon off;"]
# CMD service nginx start
# CMD ["cat", "./etc/nginx/sites-enabled/default"]
