FROM node:16

RUN mkdir /usr/app
WORKDIR /usr/app


COPY yarn.lock .
COPY package.json .
COPY prisma ./prisma
COPY .env.production .env

RUN yarn install

RUN mkdir -p prisma/migrations/0_init
RUN npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

COPY . .
EXPOSE 8000
RUN npx prisma generate
CMD ["yarn", "backend"]
