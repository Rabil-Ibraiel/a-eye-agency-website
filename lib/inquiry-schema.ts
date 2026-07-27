import { z } from "zod"
import {
  INQUIRY_BUDGETS,
  INQUIRY_PROJECT_TYPES,
  INQUIRY_TIMELINES,
} from "@/lib/inquiry-options"

export {
  INQUIRY_BUDGETS,
  INQUIRY_PROJECT_TYPES,
  INQUIRY_TIMELINES,
  inquiryBudgetLabels,
  inquiryProjectTypeLabels,
  inquiryTimelineLabels,
} from "@/lib/inquiry-options"

export const inquirySchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Enter your name.")
      .max(80, "Keep your name under 80 characters."),
    email: z
      .string()
      .trim()
      .max(254, "Keep your email under 254 characters.")
      .email("Enter a valid email address."),
    company: z
      .string()
      .trim()
      .max(120, "Keep the company name under 120 characters.")
      .optional()
      .transform((value) => value || undefined),
    projectType: z.enum(INQUIRY_PROJECT_TYPES, {
      error: "Choose a project type.",
    }),
    budget: z.enum(INQUIRY_BUDGETS, {
      error: "Choose a budget range.",
    }),
    timeline: z.enum(INQUIRY_TIMELINES, {
      error: "Choose a timeline.",
    }),
    message: z
      .string()
      .trim()
      .min(30, "Tell us a little more — at least 30 characters.")
      .max(3000, "Keep the project note under 3,000 characters."),
    consent: z
      .boolean({ error: "Confirm that we may respond to your inquiry." })
      .refine((value) => value, {
        message: "Confirm that we may respond to your inquiry.",
      }),
    honeypot: z
      .string()
      .max(0, "Please leave this field empty.")
      .default(""),
  })
  .strict()

export type InquirySubmission = z.output<typeof inquirySchema>
export type InquiryField = keyof z.input<typeof inquirySchema>
export type InquiryFieldErrors = Partial<Record<InquiryField, string[]>>
