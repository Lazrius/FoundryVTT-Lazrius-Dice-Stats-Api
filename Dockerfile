FROM node:16-alpine3.15
MAINTAINER Lazrius

# cmd=run OR cmd=update OR cmd=revert
ENV COMMAND run
ENV DB_TYPE mariadb
ENV DB_HOST localhost
ENV USERNAME root
# Emptry Password string by default
ENV PASSWORD ${1:+1}
ENV DATABASE dice-stats
ENV API_SECRET ${1:+1}

# Setup Node User
USER node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

# Install NPM packages
COPY --chown=node:node package.json .
RUN npm config set unsafe-perm true
RUN npm install

# Copy our source and build
COPY --chown=node:node . .
RUN npm run build

# Default Port
EXPOSE 3000

# Execute CLI
CMD [ "sh", "-c", "node cli.js --cmd=$COMMAND --dbType=$DB_TYPE --SECRET=$API_SECRET --host=$DB_HOST --username=$USERNAME --password=$PASSWORD --database=$DATABASE" ]
