# Corevia

A multi-page Next.js + Tailwind site template: 12 landing pages, auth, a workspace app, company pages and a 20-page component showcase. Every page is statically generated and deploys to Netlify with no backend.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

Demo login: `demo@corevia.dev` / `demo1234`

## Data (`src/data/db.json`)

All seed data lives in `src/data/db.json`: users, profile, team members, invitations, API keys, webhooks, billing, invoices, plans, FAQs, testimonials, team, chat replies, and the contact, newsletter and waitlist collections.

`src/lib/db.ts` exposes a json-server–style API (`db.list/get/create/update/remove` and a `useCollection` hook). Netlify serves the site statically and can't write files at runtime, so each visitor's changes are stored in their browser on top of the db.json seed. **Reset demo data** in the workspace sidebar restores the seed.

To share data between visitors, replace `load`/`save` in `src/lib/db.ts` with calls to Netlify Blobs, a Netlify Function or a hosted database. The hook API stays the same.

Auth (`src/lib/auth.ts`) is demo-only: SHA-256 password hashes checked against the `users` collection, with the session kept in localStorage. Use a real auth provider in production.

## Pages

| Area | Routes |
| --- | --- |
| Home | `/` (EN/ES language switch, light/dark theme) |
| Landing pages | `/app` `/saas` `/startup` `/crypto` `/ai-chat` `/integration` `/wallet` `/social` `/developers` `/personal` `/crm` `/software` |
| Auth | `/auth/login` `/auth/signup` `/auth/forgot-password` |
| Workspace (sign-in required) | `/workspace/account/profile` `/workspace/billing/overview` `/workspace/access/team` `/workspace/developers/api-keys` |
| Company | `/company/about` `services` `pricing` `contact` `faqs` `testimonials` `why-corevia` `privacy` `terms` |
| Showcase | `/showcase/<slug>`, 20 component pages with a ⌘K search |
| Other | `/coming-soon`, custom 404 |

Landing pages are built from configs in `src/lib/landings.ts`. Edit the config to change copy and sections.

## Deploy to Netlify

Connect the repo in Netlify. It detects Next.js automatically, and `netlify.toml` sets the build command and Node 20.
