# Warleague Phase 4

This zip is the deploy-oriented polish pass.

Included:
- cleaner UI
- public rules page
- standings page
- current league page
- tournament detail page
- API routes for pairings, results, finalize
- SQLite local setup
- environment examples
- Vercel-friendly Next.js structure
- deploy notes for Vercel + Postgres later

## Local setup

```bash
npm install
cd apps/web
cp .env.example .env
npx prisma generate
npx prisma db push
npm run db:seed
cd ../..
npm run dev
```

Open:
- http://localhost:3000
- http://localhost:3000/standings
- http://localhost:3000/rules

## Production notes

### Recommended hosting
- Web: Vercel
- Database: Postgres on Neon or Supabase

### For production later
Change `datasource db` provider from sqlite to postgresql and replace `DATABASE_URL`.

## What this is
This is a complete deliverable phase for testing and visual review.

## What is still intentionally simple
- no real auth/session system in this phase
- no email verification yet
- no Patreon sync yet
- no polished admin dashboard yet
