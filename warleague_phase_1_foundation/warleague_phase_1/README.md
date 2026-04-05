# Warleague — Phase 1 Foundation

This is the first delivery zip of the full project.

Included in this phase:
- Next.js app router setup
- Prisma schema
- Local SQLite database
- Seed script with demo data
- Register / login routes
- Session cookie auth (simple starter)
- Public pages: home, global standings, current league
- Logged-in page: dashboard
- Admin landing page

## Local setup

```bash
npm install
cp apps/web/.env.example apps/web/.env
npm run db:push
npm run db:seed
npm run dev
```

Open http://localhost:3000

## Demo admin credentials
- Email: admin@example.com
- Password: ChangeMe123!

## Planned next zips
- Phase 2: admin CRUD + safeguards + tournament detail + result entry
- Phase 3: pairings + finalize + standings logic + drops/forfeits
- Phase 4: UI polish + rules page + deploy config
