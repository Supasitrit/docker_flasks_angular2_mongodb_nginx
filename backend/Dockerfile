FROM ubuntu:14.04
# MAINTAINER
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

WORKDIR /app
ADD ./ams-backend/requirements.txt /app/ams-backend/requirements.txt
RUN pip install -r ams-backend/requirements.txt
COPY . /app
# ENTRYPOINT ["python"]
# RUN ls -la
CMD ["/app/ams-backend/run.py"]

EXPOSE 9000
