FROM node:14.17.0-buster
WORKDIR /opt
COPY . /opt
RUN npm install
RUN npm install -g typescript
RUN tsc
ENV NODE_PATH ./
RUN #npm run migrations
CMD ["node","src/index.js"]