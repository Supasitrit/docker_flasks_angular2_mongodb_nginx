FROM ubuntu:14.04
# MAINTAINER
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

RUN ["apt-get", "-y", "install", "nginx"]
# RUN ["rm", "-rf", "/etc/nginx/nginx.conf"]
# COPY ./nginx/nginx.conf /etc/nginx/

WORKDIR /app
ADD ./backend/requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
COPY . /app
# ENTRYPOINT ["python"]
# RUN ls -la
CMD ["/app/backend/run.py"]

CMD ["nginx", "-g", "daemon off;"]

EXPOSE 9000 80 443

