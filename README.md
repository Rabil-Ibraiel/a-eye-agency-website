# A-Eye.

A production-ready agency website for A-Eye: a human-led creative studio combining creative direction, AI content production, motion, and visual design.

The current portfolio uses clearly labelled **Fictional Project** briefs and invented brand names to demonstrate the studio's approach. They are not client commissions and publish no commercial outcomes. Founder profiles, social accounts, and contact details remain hidden until real approved content is supplied.

## Run locally

Requirements: Node.js 20.9 or newer and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
npm run test
```

`npm run check` runs the full sequence. The smoke test starts the production build on a temporary local port, checks every public route, verifies the private brand lab is excluded from search, checks robots and sitemap output, and confirms that an unconfigured inquiry form fails honestly instead of reporting a false success.

## Environment variables

Copy `.env.example` to `.env.local` before configuring production services.

| Variable | Required for launch | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public origin used by metadata, robots, sitemap, and social cards. |
| `INQUIRY_WEBHOOK_URL` | Yes for the form | Server-only JSON endpoint that receives validated inquiries. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Recommended | Monitored public fallback shown only when a real email address is configured. |

The form returns a clear `503` response until a webhook is configured. See `docs/INQUIRY_SETUP.md` for the payload and delivery contract. Add durable edge or provider-level rate limiting before launch; the included development limiter is intentionally not production infrastructure.

## Content editing

- `content/site.ts`: brand metadata, contact channels, founder profiles, and navigation.
- `content/pages.ts`: page copy and calls to action.
- `content/projects.ts`: portfolio entries and case-study modules.
- `content/services.ts`: service pages, capabilities, process, and related work.
- `content/privacy.ts`: privacy notice content and effective date.
- `public/art/`: original SVG concept artwork used by the portfolio.

Content is validated when imported. Duplicate slugs, incomplete published records, unverified commercial results, and partially filled founder profiles fail loudly instead of leaking uncertain content into the interface.

## Routes

- `/` — homepage
- `/work` and `/work/[slug]` — filterable concept portfolio and case studies
- `/services` and `/services/[slug]` — service overview and four service details
- `/about` — positioning, principles, and founder-content placeholder logic
- `/contact` — validated inquiry flow
- `/privacy` — provisional privacy notice with an explicit launch warning
- `/brand-lab` — internal visual reference; `noindex` and excluded from the sitemap

The app also includes a custom 404, error boundaries, a manifest, generated icons, a social image, robots rules, and a sitemap.

## Design and motion

The system uses Tailwind CSS and focused shadcn primitives with a compact 12-column editorial grid. Page-to-page transitions and generic reveal animations are intentionally omitted so navigation stays immediate; the one signature focus interaction uses lightweight, interruptible CSS and becomes static under `prefers-reduced-motion`. Keyboard focus, visible labels, semantic landmarks, skip navigation, and form-error focus management are included.

The work index is statically generated. Its discipline filters run in place and preserve scroll position without triggering a page navigation.

All current visual assets are original local SVG concept artwork. There is no Figma source or licensed third-party campaign photography bundled with this project.

## Production deployment

1. Complete every blocker in `LAUNCH_CHECKLIST.md`.
2. Configure the three environment variables in the hosting platform.
3. Run `npm run check` against the exact release commit.
4. Deploy the Next.js application to a Node-compatible host.
5. Repeat the form-delivery, metadata, device, and accessibility checks on the public URL.

Do not publish the provisional privacy copy or concept work as client work without approval.
