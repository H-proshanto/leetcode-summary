FROM  node:18

WORKDIR /app

COPY ./client /app/client
COPY ./server /app/server

RUN npm install -g concurrently

EXPOSE 3000 
EXPOSE 3001

WORKDIR /app/client
RUN npm install

WORKDIR /app/server
RUN npm install

CMD cd /app/server && npm run dev
