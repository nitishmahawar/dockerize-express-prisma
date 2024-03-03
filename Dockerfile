FROM node:20-alpine as base

FROM base as builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .

RUN npm install -g pnpm && \
    pnpm install && \
    pnpx prisma generate && \
    pnpm prune --prod


FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 express

COPY --from=builder --chown=express:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=express:nodejs /app/src /app/src

USER express
EXPOSE 3000

CMD [ "node", "src/index.js" ]


