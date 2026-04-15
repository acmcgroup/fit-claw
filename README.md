# Fit Claw

Marketing and API shell for **Fit Claw**: a retention-focused coaching extension (OpenClaw orchestration + central Postgres) for gyms, personal trainers, and nutrition coaches.

## Stack

- **Next.js** (App Router) on [Vercel](https://vercel.com)
- **Postgres** via your provider (e.g. Neon, Supabase)—not embedded in Vercel; connect with `DATABASE_URL`
- **Stripe** webhooks for paid installs (stub in `app/api/webhooks/stripe/route.ts`)
- **OpenClaw** runs where you deploy it (VM or other); tools should call this app’s APIs + shared database

## Setup

```bash
npm install
cp .env.example .env.local
# Edit .env.local with real values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Health check: [http://localhost:3000/api/health](http://localhost:3000/api/health).

## Environment

See `.env.example` for `NEXT_PUBLIC_SITE_URL`, `DATABASE_URL`, Stripe keys, and a signing secret for post-purchase install tokens.

## Deploy

Connect the repo to Vercel, set environment variables in the project dashboard, and deploy. Configure Stripe webhook URL to `https://<your-domain>/api/webhooks/stripe` after you implement signature verification.

## Repository

Upstream: [github.com/acmcgroup/fit-claw](https://github.com/acmcgroup/fit-claw)
