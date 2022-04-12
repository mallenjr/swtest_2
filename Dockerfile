FROM node:16

WORKDIR /app
COPY ./bmi-calc/package.json /app/package.json
RUN npm i

# FROM python:3.8

# RUN pip install flask flask-cors
# WORKDIR /api
# COPY ./*.py /api/
