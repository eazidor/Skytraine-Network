# Skytraine Alumni Network

A simple MVP web application for collecting legitimate employment opportunities
from people connected to Skytraine, verifying them, matching suitable Skytraine
graduates, tracking the application to placement, and recording a ₦20,000
successful-placement reward for the original contributor.

> This is a **V1 / MVP**. It intentionally does **not** include a public job
> feed, contributor accounts, automated WhatsApp, AI matching, employer
> dashboards, or payment processing.

## Core flow

1. A contributor submits an opportunity (no account needed).
2. The system issues a unique **Opportunity ID** (e.g. `OPP-0047`).
3. The contributor sees a confirmation page and is told updates come via WhatsApp (manual).
4. An admin reviews and verifies (or rejects) the submission.
5. The admin manually matches one or more Skytraine graduates.
6. The admin tracks each application status.
7. When placement is confirmed, a **₦20,000** reward becomes payable to the original contributor.
8. The admin later marks the reward as paid.

The full lifecycle stays attached to the original Opportunity ID and the original
contributor is always preserved.

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4**
- **Prisma 7** (PostgreSQL, `@prisma/adapter-pg`)
- **NextAuth 4** (Credentials provider for admins only)
- **bcryptjs** (password hashing)
- **zod** (form validation)

## Local setup

Requires **Node 20+** and **PostgreSQL**.

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables. Copy `.env.example` to `.env` and set values:
   ```bash
   DATABASE_URL="postgresql://user:password@host:5432/skytraine_network"
   NEXTAUTH_SECRET="<long-random-string>"
   NEXTAUTH_URL="http://localhost:3000"
   ADMIN_SEED_EMAIL="admin@skytraine.com"
   ADMIN_SEED_PASSWORD="<strong-password>"
   ```

3. Create and migrate the database:
   ```bash
   npm run db:migrate           # generates a migration and applies it (first run)
   ```

4. Create the admin account:
   ```bash
   npm run db:seed
   ```

5. Run the app:
   ```bash
   npm run dev
   ```
   - Public site: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin/login`

## Useful scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Prisma generate + production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run db:migrate` | Create/apply migrations (`prisma migrate dev`) |
| `npm run db:deploy` | Apply committed migrations without generating (`prisma migrate deploy`) |
| `npm run db:seed` | Create the admin account from env vars |
| `npm run db:studio` | Open Prisma Studio (database browsier) |

## Data model

- **Admin** — admin users (only admins have accounts).
- **Contributor** — the person who submitted an opportunity (no login).
- **Opportunity** — a submitted opportunity, permanently linked to its contributor.
  - Has its own `status` (lifecycle) and a separate reward status via the `Reward` relation.
  - Original contributor is preserved for the lifetime of the record.
- **OpportunityStatusChange** — full status history for audit.
- **Graduate** — Skytraine graduate records (no login).
- **Match** — a graduate manually assigned to an opportunity.
- **Application** — tracks one graduate's application for one opportunity.
- **Placement** — records a successful placement (employer, position, date).
- **Reward** — ₦20,000 reward linked to an opportunity, contributor and placement.

Opportunity lifecycle statuses: `SUBMITTED → UNDER_REVIEW → VERIFIED → MATCHED →
APPLICATION_SUBMITTED → INTERVIEW → PLACEMENT_CONFIRMED` (with `REJECTED` and `CLOSED`).

Reward statuses (tracked separately): `NOT_ELIGIBLE → PENDING → PAYABLE → PAID`.

## Configuration

Environment variables — see `.env.example`. All are secrets except none are
safe to expose publicly:
- `DATABASE_URL` — PostgreSQL connection string. **Required for V1.** Secret.
- `NEXTAUTH_SECRET` — signs auth session tokens. **Required for V1.** Secret.
- `NEXTAUTH_URL` — canonical app URL. **Required for V1** (set to the Vercel domain in production). Not secret but public.
- `ADMIN_SEED_*` — used only by the seed script to create the admin account. **Required setup.** The credentials are sensitive.

No external APIs (WhatsApp, email, payment) are required for V1. File storage and
email/WhatsApp automation are intentionally out of scope.

## Privacy

Public visitors only see the landing page and the submission form. Contributor
details, graduate records, internal notes, reward information and private
employer details are only shown inside the authenticated admin area.
