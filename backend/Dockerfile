FROM ubuntu:14.04
# MAINTAINER
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

WORKDIR /app
ADD ./backend/requirements.txt /app/requirements.txt
RUN pip install -r /app/requirements.txt
COPY . /app
# ENTRYPOINT ["python"]
# RUN ls -la
CMD ["/app/backend/run.py"]

EXPOSE 9000
