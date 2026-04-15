FROM node:20-bookworm

WORKDIR /workspace

COPY ./package.json /workspace/package.json
COPY ./package-lock.json /workspace/package-lock.json

RUN [ "npm", "install" ]

COPY ./nx.json /workspace/nx.json
COPY ./tsconfig* /workspace/
COPY ./libs /workspace/libs

WORKDIR /workspace/apps/speldata-api

COPY ./apps/speldata-api .

WORKDIR /workspace

RUN [ "npm", "install" ]

CMD [ "sh", "-c", "npm exec nx -- serve @org/speldata-api" ]
