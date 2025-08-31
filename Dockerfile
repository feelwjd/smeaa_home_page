# 1) deps
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) builder
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 3) runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
# (선택) 캐시 경로를 /tmp로 바꾸고 싶다면 아래 줄을 써도 됩니다.
# ENV NEXT_CACHE_DIR=/tmp/next

# 보안상 non-root 유저 생성
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# 빌드 산출물 복사 + 소유권을 런타임 유저로
COPY --from=builder --chown=1001:1001 /app/.next/standalone ./
COPY --from=builder --chown=1001:1001 /app/.next/static ./.next/static
COPY --from=builder --chown=1001:1001 /app/public ./public

# 캐시 폴더 보장
RUN mkdir -p /app/.next/cache && chown -R 1001:1001 /app/.next

USER 1001
EXPOSE 3000
CMD ["node", "server.js"]
