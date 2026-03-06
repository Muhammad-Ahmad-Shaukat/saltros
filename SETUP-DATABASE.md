# Database & API Setup (Neon Postgres)

Your `.env` already has `DATABASE_URL` and `DATABASE_URL_UNPOOLED` for Neon.

## Deploy on Vercel (recommended)

**Everything runs automatically on deploy.** No manual DB steps needed.

1. In the Vercel project, go to **Settings → Environment Variables** and add:
   - `DATABASE_URL` – your Neon pooler URL (e.g. `postgresql://...?sslmode=require`)
   - `DATABASE_URL_UNPOOLED` – your Neon direct URL (for Prisma migrations/push)

2. Deploy (or push to your connected repo). During **Build**, Vercel will:
   - Run `prisma generate` (Prisma client)
   - Run `prisma db push` (create/update tables in Neon)
   - Run the seed script (upsert sample products & collections)
   - Run `next build`

Your Neon database is created/updated and seeded on every successful build.

---

## Local development

### 1. Install dependencies

```bash
npm install
```

### 2. One-time: push schema and seed (or use full build)

```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

Or run a full build (same as Vercel):

```bash
npm run build
```

### 3. Run the app

```bash
npm run dev
```

## What’s implemented

- **Products & collections** – Served from Postgres via `src/lib/data-db.ts`. Existing pages (shop, collection, product detail) use this layer.
- **Cart** – Stored in Postgres; identified by a cookie (`cart_id`). Add/update/remove via:
  - `POST /api/cart` – add item (body: `{ productId, quantity?, options? }`)
  - `PATCH /api/cart/items/[id]` – update quantity
  - `DELETE /api/cart/items/[id]` – remove item
- **Checkout** – `POST /api/checkout` with `{ email, shippingAddress }` creates an order, clears the cart, and returns `orderNumber`. Checkout form posts to this and redirects to `/order-successful?order=XXX`.
- **Orders** – List and detail use the current session (same cookie as cart). Orders are stored in Postgres with line items and totals.

## Useful commands

| Command                | Description                          |
|------------------------|--------------------------------------|
| `npm run build`        | Generate client, push schema, seed, build Next.js (used by Vercel) |
| `npm run db:generate`  | Generate Prisma client only          |
| `npm run db:push`      | Push schema to DB only               |
| `npm run db:seed`      | Seed products/collections only       |
| `npm run db:studio`    | Open Prisma Studio                   |
