# A-Eye launch checklist

The product and interaction build is complete. The unchecked items below require real business information, approval, or production infrastructure and must not be guessed.

## Launch blockers

- [ ] Confirm the final public domain and set `NEXT_PUBLIC_SITE_URL`.
- [ ] Connect `INQUIRY_WEBHOOK_URL` to a tested endpoint that persists or queues each inquiry before returning success.
- [ ] Add durable production rate limiting at the edge, gateway, or delivery provider.
- [ ] Set and monitor `NEXT_PUBLIC_CONTACT_EMAIL`; test the fallback address from outside the organization.
- [ ] Approve a legally reviewed privacy notice, effective date, jurisdiction, processors, retention period, and data-request contact.
- [ ] Decide whether the three concept studies remain public, are replaced by approved client work, or are expanded with real evidence.
- [ ] Obtain written permission for every future client name, logo, image, credit, testimonial, result, and metric.
- [ ] Supply approved names, roles, bios, portraits, and profile links before enabling founder cards.

## Brand and content decisions

- [ ] Approve final agency positioning, service language, pricing/budget ranges, and calls to action.
- [ ] Confirm the public location, phone, booking link, WhatsApp link, and social profiles, if any.
- [ ] Add a showreel only if a real accessible video, poster, captions, and usage rights exist.
- [ ] Approve the favicon, social-card copy, and social-card artwork.
- [ ] Proofread all copy with the founders and verify regional spelling and terminology.
- [ ] Confirm ownership or licenses for every production asset and font added after handoff.

## Privacy, analytics, and operations

- [ ] Decide whether analytics are necessary; configure consent and disclosure before adding non-essential tracking.
- [ ] Document who receives inquiries, response-time expectations, backup ownership, and deletion procedures.
- [ ] Confirm the webhook never logs secrets or exposes upstream responses to visitors.
- [ ] Add abuse monitoring, delivery alerts, backups, and a recovery or rollback owner.
- [ ] Review security headers and hosting-platform protections on the deployed origin.

## Release verification

- [ ] Run `npm run check` from a clean install using the release environment.
- [ ] Test Chrome, Safari, Firefox, and Edge at 320, 390, 768, 1440, and 1920 CSS pixels.
- [ ] Test keyboard-only navigation, skip link, mobile menu focus, form errors, and focus restoration.
- [ ] Test with screen-reader landmarks and accessible names on at least one desktop and one mobile platform.
- [ ] Verify `prefers-reduced-motion`, 200% zoom, forced-colors/high-contrast mode, and touch-only behavior.
- [ ] Confirm real inquiry delivery, failure messaging, duplicate handling, rate limits, and email fallback.
- [ ] Confirm canonical URLs, page titles, descriptions, social previews, `robots.txt`, and `sitemap.xml` on the final domain.
- [ ] Run Lighthouse or an equivalent field-oriented audit and investigate regressions in LCP, CLS, INP, accessibility, and SEO.
- [ ] Check every outbound link, error page, not-found route, and direct deep link after deployment.
- [ ] Record the release commit, environment settings, rollback procedure, and post-launch owner.
