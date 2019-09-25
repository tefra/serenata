FROM node:11.9-alpine

ARG USER_ID
ARG GROUP_ID

# Alpine specific user commands
RUN if [ ${USER_ID:-0} -ne 0 ] && [ ${GROUP_ID:-0} -ne 0 ]; then \
    deluser node &&\
    if getent group node ; then groupdel node; fi &&\
    addgroup -g ${GROUP_ID} node &&\
    adduser -u ${USER_ID} -D node -G node && \
    install -d -m 0755 -o node -g node /home/node \
;fi

 # Create app directory
RUN mkdir -p /usr/app && chown -R node:node /usr/app
WORKDIR /usr/app

USER node

 # Set node environment
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

 # Install app dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install

 # Bundle app source and configs
COPY ./src ./src

CMD ["node", "./src/server.js"]
