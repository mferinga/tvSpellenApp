FROM node:20-bookworm

WORKDIR /workspace

COPY ./package.json /workspace/package.json
COPY ./package-lock.json /workspace/package-lock.json

RUN [ "npm", "install" ]

COPY ./nx.json /workspace/nx.json
COPY ./tsconfig* /workspace/
COPY ./libs /workspace/libs

COPY ./apps/tvSpellenWebApp /workspace/apps/tvSpellenWebApp
COPY ./apps/speldata-api /workspace/apps/speldata-api
COPY ./apps/recom-api /workspace/apps/recom-api

RUN [ "npm", "install" ]

RUN [ "sh", "-c", "npm exec nx -- sync" ]

CMD [ "sh", "-c", "npm exec nx -- serve @org/tvSpellenWebApp" ]
