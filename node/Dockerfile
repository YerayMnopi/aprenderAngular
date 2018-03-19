FROM node:9.4-alpine

COPY universal-starter-master/package.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY ./universal-starter-master .

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build:prerender

CMD ["node", "dist/server"]
