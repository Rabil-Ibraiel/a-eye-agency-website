import "server-only"

import type { InquirySubmission } from "@/lib/inquiry-schema"

export type DeliverableInquiry = Omit<InquirySubmission, "honeypot">

export type InquiryDeliveryResult =
  | { ok: true }
  | {
      ok: false
      reason: "not_configured" | "timeout" | "upstream_error"
    }

const WEBHOOK_TIMEOUT_MS = 8_000

function getWebhookUrl() {
  const configuredUrl = process.env.INQUIRY_WEBHOOK_URL?.trim()

  if (!configuredUrl) {
    return null
  }

  try {
    const url = new URL(configuredUrl)

    if (url.protocol !== "https:" && url.protocol !== "http:") {
      return null
    }

    return url
  } catch {
    return null
  }
}

export function isInquiryTransportConfigured() {
  return getWebhookUrl() !== null
}

export async function deliverInquiry(
  inquiry: DeliverableInquiry
): Promise<InquiryDeliveryResult> {
  const webhookUrl = getWebhookUrl()

  if (!webhookUrl) {
    return { ok: false, reason: "not_configured" }
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "user-agent": "A-Eye-Inquiry/1.0",
      },
      body: JSON.stringify({
        source: "a-eye-website",
        submittedAt: new Date().toISOString(),
        inquiry,
      }),
      cache: "no-store",
      signal: controller.signal,
    })

    if (!response.ok) {
      return { ok: false, reason: "upstream_error" }
    }

    return { ok: true }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { ok: false, reason: "timeout" }
    }

    return { ok: false, reason: "upstream_error" }
  } finally {
    clearTimeout(timeout)
  }
}

