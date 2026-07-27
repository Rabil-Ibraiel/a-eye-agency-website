import { inquirySchema } from "@/lib/inquiry-schema"
import {
  deliverInquiry,
  type DeliverableInquiry,
} from "@/lib/inquiry-transport"

export const runtime = "nodejs"

const MAX_BODY_BYTES = 32_000
const DEV_RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const DEV_RATE_LIMIT_MAX_REQUESTS = 5

type DevRateLimitRecord = {
  count: number
  resetAt: number
}

type GlobalWithInquiryRateLimit = typeof globalThis & {
  __aEyeInquiryRateLimit?: Map<string, DevRateLimitRecord>
}

const globalWithInquiryRateLimit = globalThis as GlobalWithInquiryRateLimit

function json(data: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers)
  headers.set("cache-control", "no-store")

  return Response.json(data, { ...init, headers })
}

function getDevelopmentClientKey(request: Request) {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim()

  return forwarded || request.headers.get("x-real-ip") || "local-development"
}

/**
 * Convenience protection for local previews only. This process-local map resets
 * on restart, is not shared across instances, and trusts proxy headers. Production
 * must use an edge, gateway, or durable rate limiter instead.
 */
function checkDevelopmentRateLimit(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return { allowed: true as const }
  }

  const now = Date.now()
  const key = getDevelopmentClientKey(request)
  const store =
    globalWithInquiryRateLimit.__aEyeInquiryRateLimit ??
    new Map<string, DevRateLimitRecord>()

  globalWithInquiryRateLimit.__aEyeInquiryRateLimit = store

  const existing = store.get(key)

  if (!existing || existing.resetAt <= now) {
    store.set(key, {
      count: 1,
      resetAt: now + DEV_RATE_LIMIT_WINDOW_MS,
    })

    return { allowed: true as const }
  }

  if (existing.count >= DEV_RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    }
  }

  existing.count += 1
  store.set(key, existing)

  return { allowed: true as const }
}

export async function POST(request: Request) {
  const rateLimit = checkDevelopmentRateLimit(request)

  if (!rateLimit.allowed) {
    return json(
      {
        ok: false,
        code: "rate_limited",
        message: "Too many attempts. Please wait a moment and try again.",
      },
      {
        status: 429,
        headers: { "retry-after": String(rateLimit.retryAfterSeconds) },
      }
    )
  }

  const contentLength = Number(request.headers.get("content-length") || "0")

  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json(
      {
        ok: false,
        code: "payload_too_large",
        message: "The inquiry is too large. Please shorten it and try again.",
      },
      { status: 413 }
    )
  }

  if (!request.headers.get("content-type")?.includes("application/json")) {
    return json(
      {
        ok: false,
        code: "unsupported_media_type",
        message: "The inquiry could not be read. Please refresh and try again.",
      },
      { status: 415 }
    )
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return json(
      {
        ok: false,
        code: "invalid_json",
        message: "The inquiry could not be read. Please refresh and try again.",
      },
      { status: 400 }
    )
  }

  const validation = inquirySchema.safeParse(body)

  if (!validation.success) {
    const fieldErrors = { ...validation.error.flatten().fieldErrors }
    delete fieldErrors.honeypot

    return json(
      {
        ok: false,
        code: "validation_error",
        message: "Please review the highlighted fields and try again.",
        fieldErrors,
      },
      { status: 422 }
    )
  }

  const data = validation.data
  const inquiry: DeliverableInquiry = {
    name: data.name,
    email: data.email,
    company: data.company,
    projectType: data.projectType,
    budget: data.budget,
    timeline: data.timeline,
    message: data.message,
    consent: data.consent,
  }

  const delivery = await deliverInquiry(inquiry)

  if (!delivery.ok) {
    if (delivery.reason === "not_configured") {
      return json(
        {
          ok: false,
          code: "transport_not_configured",
          message:
            "This form is not connected yet. Please use the contact email shown on this page, if available.",
        },
        { status: 503 }
      )
    }

    return json(
      {
        ok: false,
        code: "delivery_failed",
        message:
          "We could not deliver your inquiry right now. Please try again or use the contact email shown on this page.",
      },
      { status: 502 }
    )
  }

  return json(
    {
      ok: true,
      message: "Your inquiry was delivered successfully.",
    },
    { status: 201 }
  )
}

