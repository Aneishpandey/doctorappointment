FROM node:20

WORKDIR /doctorappoinment
COPY . .
RUN npm i
RUN npm run build
EXPOSE 3000
ENTRYPOINT [ "npm","start" ]
