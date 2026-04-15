FROM node:20-bookworm

WORKDIR /workspace

COPY ./package.json /workspace/package.json
COPY ./package-lock.json /workspace/package-lock.json

RUN [ "npm", "install" ]

COPY ./nx.json /workspace/nx.json
COPY ./tsconfig* /workspace/
COPY ./libs /workspace/libs

COPY ./apps/recom-api /workspace/apps/recom-api

RUN [ "npm", "install" ]

CMD [ "sh", "-c", "npm exec nx -- serve @org/recom-api" ]
