"use client"

import { useId, useRef, useState, type FormEvent } from "react"
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  type InquiryField,
  type InquiryFieldErrors,
} from "@/lib/inquiry-schema"
import {
  INQUIRY_BUDGETS,
  INQUIRY_PROJECT_TYPES,
  INQUIRY_TIMELINES,
  inquiryBudgetLabels,
  inquiryProjectTypeLabels,
  inquiryTimelineLabels,
} from "@/lib/inquiry-options"
import { cn } from "@/lib/utils"

type InquiryFormStatus =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "error"; message: string }
  | { kind: "success"; message: string }

type InquiryApiResponse = {
  ok?: boolean
  message?: string
  fieldErrors?: InquiryFieldErrors
}

type InquiryCandidate = {
  name: string
  email: string
  company: string
  projectType: string
  budget: string
  timeline: string
  message: string
  consent: boolean
  honeypot: string
}

export type InquiryFormProps = {
  transportConfigured: boolean
  contactEmail?: string | null
  className?: string
}

function getSafeContactEmail(contactEmail?: string | null) {
  const value = contactEmail?.trim()

  if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return null
  }

  return value
}

function firstError(errors: InquiryFieldErrors, field: InquiryField) {
  return errors[field]?.[0]
}

function errorDescriptionId(baseId: string, field: InquiryField) {
  return `${baseId}-${field}-error`
}

function validateInquiryCandidate(candidate: InquiryCandidate) {
  const errors: InquiryFieldErrors = {}
  const add = (field: InquiryField, message: string) => {
    errors[field] = [...(errors[field] ?? []), message]
  }
  const name = candidate.name.trim()
  const email = candidate.email.trim()
  const company = candidate.company.trim()
  const message = candidate.message.trim()

  if (name.length < 2) add("name", "Enter your name.")
  else if (name.length > 80) add("name", "Keep your name under 80 characters.")

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    add("email", "Enter a valid email address.")
  } else if (email.length > 254) {
    add("email", "Keep your email under 254 characters.")
  }

  if (company.length > 120) add("company", "Keep the company name under 120 characters.")
  if (!INQUIRY_PROJECT_TYPES.includes(candidate.projectType as never)) {
    add("projectType", "Choose a project type.")
  }
  if (!INQUIRY_BUDGETS.includes(candidate.budget as never)) {
    add("budget", "Choose a budget range.")
  }
  if (!INQUIRY_TIMELINES.includes(candidate.timeline as never)) {
    add("timeline", "Choose a timeline.")
  }
  if (message.length < 30) add("message", "Tell us a little more — at least 30 characters.")
  else if (message.length > 3000) add("message", "Keep the project note under 3,000 characters.")
  if (!candidate.consent) add("consent", "Confirm that we may respond to your inquiry.")
  if (candidate.honeypot) add("honeypot", "Please leave this field empty.")

  return errors
}

function FieldMessage({
  baseId,
  field,
  errors,
}: {
  baseId: string
  field: InquiryField
  errors: InquiryFieldErrors
}) {
  const message = firstError(errors, field)

  if (!message) {
    return null
  }

  return (
    <FieldError id={errorDescriptionId(baseId, field)}>
      {message}
    </FieldError>
  )
}

export function InquiryForm({
  transportConfigured,
  contactEmail,
  className,
}: InquiryFormProps) {
  const baseId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const safeContactEmail = getSafeContactEmail(contactEmail)
  const [projectType, setProjectType] = useState("")
  const [budget, setBudget] = useState("")
  const [timeline, setTimeline] = useState("")
  const [consent, setConsent] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<InquiryFieldErrors>({})
  const [status, setStatus] = useState<InquiryFormStatus>({ kind: "idle" })

  const isSubmitting = status.kind === "submitting"

  function focusFirstInvalidField() {
    requestAnimationFrame(() => {
      formRef.current
        ?.querySelector<HTMLElement>('[aria-invalid="true"]')
        ?.focus()
    })
  }

  function clearFieldError(field: InquiryField) {
    setFieldErrors((current) => {
      if (!current[field]) {
        return current
      }

      const next = { ...current }
      delete next[field]
      return next
    })

    if (status.kind === "error") {
      setStatus({ kind: "idle" })
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting) {
      return
    }

    const formData = new FormData(event.currentTarget)
    const candidate = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      company: String(formData.get("company") ?? ""),
      projectType,
      budget,
      timeline,
      message: String(formData.get("message") ?? ""),
      consent,
      honeypot: String(formData.get("website") ?? ""),
    }
    const errors = validateInquiryCandidate(candidate)

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setStatus({
        kind: "error",
        message: "Please review the highlighted fields and try again.",
      })
      focusFirstInvalidField()
      return
    }

    setFieldErrors({})
    setStatus({ kind: "submitting" })

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(candidate),
      })
      const payload = (await response
        .json()
        .catch(() => null)) as InquiryApiResponse | null

      if (!response.ok || !payload?.ok) {
        if (payload?.fieldErrors) {
          setFieldErrors(payload.fieldErrors)
          focusFirstInvalidField()
        }

        setStatus({
          kind: "error",
          message:
            payload?.message ??
            "We could not deliver your inquiry right now. Please try again.",
        })
        return
      }

      formRef.current?.reset()
      setProjectType("")
      setBudget("")
      setTimeline("")
      setConsent(false)
      setStatus({
        kind: "success",
        message: payload.message ?? "Your inquiry was delivered successfully.",
      })
    } catch {
      setStatus({
        kind: "error",
        message:
          "We could not reach the inquiry service. Check your connection and try again.",
      })
    }
  }

  if (status.kind === "success") {
    return (
      <section
        className={cn(
          "rounded-[var(--radius)] border border-primary/30 bg-primary/5 p-6 md:p-8",
          className
        )}
        aria-labelledby={`${baseId}-success-title`}
        role="status"
      >
        <CheckCircle2
          data-icon="inline-start"
          aria-hidden="true"
          className="mb-5 size-6 text-primary"
        />
        <h2
          id={`${baseId}-success-title`}
          className="text-xl font-medium tracking-tight"
        >
          Inquiry delivered
        </h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          {status.message} We will review the note before replying.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 h-11 px-4"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another inquiry
        </Button>
      </section>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      {!transportConfigured && (
        <div
          className="mb-6 rounded-[var(--radius)] border border-amber-500/35 bg-amber-500/10 p-4 text-sm leading-6"
          role="note"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle
              data-icon="inline-start"
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-amber-300"
            />
            <div>
              <p className="font-medium">Inquiry delivery is in setup mode.</p>
              <p className="mt-1 text-muted-foreground">
                This form will show an error instead of pretending a message was
                sent until its delivery webhook is connected.
              </p>
              {safeContactEmail ? (
                <a
                  className="mt-2 inline-flex min-h-11 items-center font-medium underline decoration-current/35 underline-offset-4 transition-colors hover:text-primary"
                  href={`mailto:${safeContactEmail}`}
                >
                  Email {safeContactEmail}
                  <ArrowUpRight
                    data-icon="inline-end"
                    aria-hidden="true"
                    className="ml-1.5 size-4"
                  />
                </a>
              ) : (
                <p className="mt-2 font-medium">
                  No public contact email has been configured yet.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {status.kind === "error" && (
        <div
          className="mb-6 rounded-[var(--radius)] border border-destructive/35 bg-destructive/10 p-4 text-sm leading-6"
          role="alert"
          aria-live="assertive"
        >
          <p className="font-medium">The inquiry was not sent.</p>
          <p className="mt-1 text-muted-foreground">{status.message}</p>
          {safeContactEmail && (
            <a
              className="mt-2 inline-flex min-h-11 items-center font-medium underline decoration-current/35 underline-offset-4 transition-colors hover:text-primary"
              href={`mailto:${safeContactEmail}`}
            >
              Use email instead
              <ArrowUpRight
                data-icon="inline-end"
                aria-hidden="true"
                className="ml-1.5 size-4"
              />
            </a>
          )}
        </div>
      )}

      <form
        ref={formRef}
        noValidate
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
      >
        <FieldGroup className="gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Field data-invalid={Boolean(firstError(fieldErrors, "name"))}>
              <FieldLabel htmlFor={`${baseId}-name`}>Name</FieldLabel>
              <Input
                id={`${baseId}-name`}
                name="name"
                placeholder="e.g. Lina Haddad…"
                autoComplete="name"
                maxLength={80}
                required
                aria-invalid={Boolean(firstError(fieldErrors, "name"))}
                aria-describedby={
                  firstError(fieldErrors, "name")
                    ? errorDescriptionId(baseId, "name")
                    : undefined
                }
                className="h-11 px-3"
                onChange={() => clearFieldError("name")}
              />
              <FieldMessage
                baseId={baseId}
                field="name"
                errors={fieldErrors}
              />
            </Field>

            <Field data-invalid={Boolean(firstError(fieldErrors, "email"))}>
              <FieldLabel htmlFor={`${baseId}-email`}>Email</FieldLabel>
              <Input
                id={`${baseId}-email`}
                name="email"
                type="email"
                placeholder="e.g. lina@studio.com…"
                inputMode="email"
                spellCheck={false}
                autoComplete="email"
                maxLength={254}
                required
                aria-invalid={Boolean(firstError(fieldErrors, "email"))}
                aria-describedby={
                  firstError(fieldErrors, "email")
                    ? errorDescriptionId(baseId, "email")
                    : undefined
                }
                className="h-11 px-3"
                onChange={() => clearFieldError("email")}
              />
              <FieldMessage
                baseId={baseId}
                field="email"
                errors={fieldErrors}
              />
            </Field>
          </div>

          <Field
            data-invalid={Boolean(firstError(fieldErrors, "company"))}
            className="md:w-[calc(50%-0.75rem)]"
          >
            <FieldLabel htmlFor={`${baseId}-company`}>
              Company <span className="font-normal text-muted-foreground">Optional</span>
            </FieldLabel>
            <Input
              id={`${baseId}-company`}
              name="company"
              placeholder="e.g. Northline Studio…"
              autoComplete="organization"
              maxLength={120}
              aria-invalid={Boolean(firstError(fieldErrors, "company"))}
              aria-describedby={
                firstError(fieldErrors, "company")
                  ? errorDescriptionId(baseId, "company")
                  : undefined
              }
              className="h-11 px-3"
              onChange={() => clearFieldError("company")}
            />
            <FieldMessage
              baseId={baseId}
              field="company"
              errors={fieldErrors}
            />
          </Field>

          <div className="grid gap-6 md:grid-cols-3">
            <Field
              data-invalid={Boolean(firstError(fieldErrors, "projectType"))}
            >
              <FieldLabel htmlFor={`${baseId}-project-type`}>
                Project type
              </FieldLabel>
              <select
                id={`${baseId}-project-type`}
                name="projectType"
                value={projectType}
                onChange={(event) => {
                  setProjectType(event.target.value)
                  clearFieldError("projectType")
                }}
                autoComplete="off"
                required
                aria-invalid={Boolean(firstError(fieldErrors, "projectType"))}
                aria-describedby={
                  firstError(fieldErrors, "projectType")
                    ? errorDescriptionId(baseId, "projectType")
                    : undefined
                }
                className={cn(
                  "h-11 w-full rounded-[var(--radius)] border border-input bg-background px-3 text-base text-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive md:text-sm",
                  !projectType && "text-muted-foreground",
                )}
              >
                <option value="" disabled>Select project type…</option>
                {INQUIRY_PROJECT_TYPES.map((value) => (
                  <option key={value} value={value}>{inquiryProjectTypeLabels[value]}</option>
                ))}
              </select>
              <FieldMessage
                baseId={baseId}
                field="projectType"
                errors={fieldErrors}
              />
            </Field>

            <Field data-invalid={Boolean(firstError(fieldErrors, "budget"))}>
              <FieldLabel htmlFor={`${baseId}-budget`}>Budget</FieldLabel>
              <select
                id={`${baseId}-budget`}
                name="budget"
                value={budget}
                onChange={(event) => {
                  setBudget(event.target.value)
                  clearFieldError("budget")
                }}
                autoComplete="off"
                required
                aria-invalid={Boolean(firstError(fieldErrors, "budget"))}
                aria-describedby={
                  firstError(fieldErrors, "budget")
                    ? errorDescriptionId(baseId, "budget")
                    : undefined
                }
                className={cn(
                  "h-11 w-full rounded-[var(--radius)] border border-input bg-background px-3 text-base text-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive md:text-sm",
                  !budget && "text-muted-foreground",
                )}
              >
                <option value="" disabled>Select budget range…</option>
                {INQUIRY_BUDGETS.map((value) => (
                  <option key={value} value={value}>{inquiryBudgetLabels[value]}</option>
                ))}
              </select>
              <FieldMessage
                baseId={baseId}
                field="budget"
                errors={fieldErrors}
              />
            </Field>

            <Field data-invalid={Boolean(firstError(fieldErrors, "timeline"))}>
              <FieldLabel htmlFor={`${baseId}-timeline`}>Timeline</FieldLabel>
              <select
                id={`${baseId}-timeline`}
                name="timeline"
                value={timeline}
                onChange={(event) => {
                  setTimeline(event.target.value)
                  clearFieldError("timeline")
                }}
                autoComplete="off"
                required
                aria-invalid={Boolean(firstError(fieldErrors, "timeline"))}
                aria-describedby={
                  firstError(fieldErrors, "timeline")
                    ? errorDescriptionId(baseId, "timeline")
                    : undefined
                }
                className={cn(
                  "h-11 w-full rounded-[var(--radius)] border border-input bg-background px-3 text-base text-foreground focus-visible:border-ring focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-invalid:border-destructive md:text-sm",
                  !timeline && "text-muted-foreground",
                )}
              >
                <option value="" disabled>Select timeline…</option>
                {INQUIRY_TIMELINES.map((value) => (
                  <option key={value} value={value}>{inquiryTimelineLabels[value]}</option>
                ))}
              </select>
              <FieldMessage
                baseId={baseId}
                field="timeline"
                errors={fieldErrors}
              />
            </Field>
          </div>

          <Field data-invalid={Boolean(firstError(fieldErrors, "message"))}>
            <FieldLabel htmlFor={`${baseId}-message`}>
              What should we know?
            </FieldLabel>
            <FieldDescription>
              Share the context, ambition, and any constraints already in view.
            </FieldDescription>
            <Textarea
              id={`${baseId}-message`}
              name="message"
              placeholder="e.g. We’re launching a new product in October and need a campaign system, key visuals, and motion cutdowns…"
              rows={7}
              minLength={30}
              maxLength={3000}
              required
              aria-invalid={Boolean(firstError(fieldErrors, "message"))}
              aria-describedby={
                firstError(fieldErrors, "message")
                  ? errorDescriptionId(baseId, "message")
                  : undefined
              }
              className="min-h-36 resize-y px-3 py-3"
              onChange={() => clearFieldError("message")}
            />
            <FieldMessage
              baseId={baseId}
              field="message"
              errors={fieldErrors}
            />
          </Field>

          <Field
            orientation="horizontal"
            data-invalid={Boolean(firstError(fieldErrors, "consent"))}
            className="items-start"
          >
            <input
              type="checkbox"
              id={`${baseId}-consent`}
              checked={consent}
              onChange={(event) => {
                setConsent(event.target.checked)
                clearFieldError("consent")
              }}
              required
              aria-invalid={Boolean(firstError(fieldErrors, "consent"))}
              aria-describedby={
                firstError(fieldErrors, "consent")
                  ? errorDescriptionId(baseId, "consent")
                  : undefined
              }
              className="mt-1 size-5 shrink-0 rounded-[2px] border border-input accent-primary"
            />
            <div className="min-w-0 flex-1">
              <FieldLabel
                htmlFor={`${baseId}-consent`}
                className="min-h-11 cursor-pointer items-start py-1 leading-6"
              >
                A-Eye may use these details to assess this inquiry and reply.
              </FieldLabel>
              <FieldMessage
                baseId={baseId}
                field="consent"
                errors={fieldErrors}
              />
            </div>
          </Field>

          <div
            className="absolute -left-[10000px] h-px w-px overflow-hidden"
            aria-hidden="true"
            inert
          >
            <label htmlFor={`${baseId}-website`}>Website</label>
            <input
              id={`${baseId}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-xs leading-5 text-muted-foreground">
              No submission is marked successful until the configured endpoint
              accepts it.
            </p>
            <Button
              type="submit"
              size="lg"
              className="h-11 min-w-40 px-5"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle
                    data-icon="inline-start"
                    aria-hidden="true"
                    className="animate-spin"
                  />
                  Sending…
                </>
              ) : (
                <>
                  Send inquiry
                  <ArrowUpRight data-icon="inline-end" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  )
}
