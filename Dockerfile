FROM node:16 as web-base

WORKDIR /app
COPY ./bmi-calc/package.json /app/package.json
RUN npm i

FROM web-base AS web-build

WORKDIR /app
COPY ./bmi-calc ./

RUN npm run build

FROM python:3.8 

RUN pip install flask flask-cors
WORKDIR /api
COPY ./*.py /api/
COPY --from=web-build /app/build ./bmi-calc/build

CMD ["python", "api.py"]