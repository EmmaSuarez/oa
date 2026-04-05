# Warleague Phase 3B

This phase adds the tournament engine pieces that matter for real testing:

- Swiss pairing with rematch avoidance
- Bye pairing support
- Forfeit / bye handling
- Adjusted SoS
- Tournament finalization
- League point assignment
- Tournament detail page

## Local run

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

Open http://localhost:3000
