# Inquiry form setup

The inquiry form deliberately reports success only after a configured delivery endpoint accepts the submission.

## Configure delivery

1. Copy `.env.example` to `.env.local`.
2. Set `INQUIRY_WEBHOOK_URL` to an HTTP(S) endpoint that accepts JSON `POST` requests.
3. Optionally set `NEXT_PUBLIC_CONTACT_EMAIL` to a real monitored mailbox. The UI shows an email fallback only when this value exists and looks like an email address.
4. Restart the development server after changing environment variables.

The webhook receives this shape:

```json
{
  "source": "a-eye-website",
  "submittedAt": "2026-07-15T12:00:00.000Z",
  "inquiry": {
    "name": "…",
    "email": "…",
    "company": "…",
    "projectType": "…",
    "budget": "…",
    "timeline": "…",
    "message": "…",
    "consent": true
  }
}
```

Any `2xx` response counts as delivered. A missing webhook returns `503`; a timeout or non-`2xx` response returns `502`. The server does not expose upstream response bodies or configuration details.

## Spam and rate limiting

The form includes a honeypot and shared client/server validation. In development only, the route also uses a small in-memory limit of five requests per ten minutes per forwarded IP. That limiter is intentionally **not production-safe**: it resets with the process, is not shared across instances, and trusts proxy headers. Add a durable provider-level or edge rate limit before launch.

The webhook has an eight-second timeout. It should validate and persist or enqueue the inquiry before returning a `2xx` response.

