FROM node:argon

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g mean-cli bower gulp

RUN	groupadd -r node \
&&	useradd -r -m -g node node

COPY . /usr/src/app/
RUN rm -rf /usr/src/app/node_modules
RUN chown -R node:node /usr/src/app

USER node
RUN touch /home/node/.mean
RUN npm install
RUN gulp

ENV PORT 3000
ENV DB_PORT_27017_TCP_ADDR db

CMD [ "npm", "start" ]
EXPOSE 3000
