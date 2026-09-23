# weTag Production Cloud Deployment & Infrastructure Guide

*Target: AWS ECS / Render / Fly.io / Self-Hosted Docker in Lagos & Frankfurt*

---

## 1. Production Architecture Overview

```
                      INTERNET / CLIENTS
                               │
                Cloudflare CDN + WAF / SSL
                               │
               NGINX / Caddy Reverse Proxy
        ┌──────────────────────┼──────────────────────┐
        │                      │                      │
   :3000 (Admin Web)     :3001-:3004 (APIs)      :8080 (Landing)
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
               PostgreSQL 16 + PostGIS & Redis 7
```

---

## 2. Environment Configuration Matrix

| Variable | Description | Sample Production Value |
| :--- | :--- | :--- |
| `NODE_ENV` | Runtime environment | `production` |
| `DATABASE_URL` | PostgreSQL with PostGIS connection | `postgresql://user:pass@db.wetag.internal:5432/wetag_prod?pgbouncer=true` |
| `REDIS_URL` | Redis cache & rate limiter | `redis://default:secret@redis.wetag.internal:6379` |
| `JWT_SECRET` | 256-bit cryptographically random key | `hex-encoded-secret-key-32-bytes` |
| `PAYSTACK_SECRET_KEY` | Live Paystack API secret | `sk_live_••••••••••••••••` |
| `TERMII_API_KEY` | Live Termii SMS gateway key | `termii_live_••••••••••••` |
| `SMILE_ID_API_KEY` | Live Smile ID KYC partner key | `smile_live_•••••••••••••` |
| `SENTRY_DSN` | Sentry exception tracking | `https://••••@o450.ingest.sentry.io/••••` |

---

## 3. Production Microservice Manifest

| Service | Port | Base Path | Health Check |
| :--- | :--- | :--- | :--- |
| **Identity Service** | `3001` | `https://api.wetag.ng/identity` | `GET /health` |
| **Move Service** | `3002` | `https://api.wetag.ng/move` | `GET /health` |
| **Stay Service** | `3003` | `https://api.wetag.ng/stay` | `GET /health` |
| **Wallet Service** | `3004` | `https://api.wetag.ng/wallet` | `GET /health` |
| **Admin Console** | `3000` | `https://admin.wetag.ng` | `GET /` |
| **Waitlist & Landing**| `8080` | `https://wetag.ng` | `GET /` |

---

## 4. Database Initialization & Seed Command
```bash
# 1. Run migrations
npx prisma migrate deploy --schema=services/identity/schema.prisma
npx prisma migrate deploy --schema=services/move/schema.prisma
npx prisma migrate deploy --schema=services/stay/schema.prisma
npx prisma migrate deploy --schema=services/wallet/schema.prisma

# 2. Seed master Ibadan launch hubs and admin accounts
npx ts-node services/seed.ts
```
