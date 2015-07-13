FROM cloudron/base:0.3.0
MAINTAINER Anders Bakken <agbakken@gmail.com>

EXPOSE 3000
RUN mkdir /app/
ADD . /app/
WORKDIR /app/
RUN npm install
CMD [ "node", "/app/server.js" ]