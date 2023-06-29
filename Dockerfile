FROM  node:18

WORKDIR /app

COPY ./client /app/client
COPY ./server /app/server

EXPOSE 3000
EXPOSE 5173

WORKDIR /app/client
RUN npm install

WORKDIR /app/server
RUN npm install
RUN npm run start

CMD cd /app/client && npm run dev