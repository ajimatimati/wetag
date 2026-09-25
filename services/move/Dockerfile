FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY schema.prisma ./

RUN npm ci
RUN npx prisma generate

COPY src/ ./src/
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=builder /app/dist ./dist
COPY schema.prisma ./

EXPOSE 3002

CMD ["node", "dist/index.js"]
