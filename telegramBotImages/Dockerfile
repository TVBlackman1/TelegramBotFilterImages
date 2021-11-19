FROM node:14.17.0-buster
WORKDIR /opt
ADD . /opt
RUN npm install
RUN npm install -g typescript
RUN ls
RUN tsc
ENV NODE_PATH ./
CMD ["node","src/index.js"]