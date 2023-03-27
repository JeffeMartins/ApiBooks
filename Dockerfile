FROM node:14

EXPOSE 3000

ADD . /apiBooks

RUN cd /apiBooks && npm i

WORKDIR /apiBooks