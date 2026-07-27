export const INQUIRY_PROJECT_TYPES = [
  "brand-identity",
  "campaign",
  "digital-experience",
  "motion",
  "strategic-partnership",
  "other",
] as const;

export const INQUIRY_BUDGETS = [
  "under-15k",
  "15k-30k",
  "30k-60k",
  "60k-plus",
  "not-sure",
] as const;

export const INQUIRY_TIMELINES = [
  "within-6-weeks",
  "2-3-months",
  "3-6-months",
  "flexible",
] as const;

export const inquiryProjectTypeLabels: Record<
  (typeof INQUIRY_PROJECT_TYPES)[number],
  string
> = {
  "brand-identity": "Brand identity",
  campaign: "Campaign or launch",
  "digital-experience": "Digital experience",
  motion: "Motion system",
  "strategic-partnership": "Ongoing creative partnership",
  other: "Something else",
};

export const inquiryBudgetLabels: Record<
  (typeof INQUIRY_BUDGETS)[number],
  string
> = {
  "under-15k": "Under $15k",
  "15k-30k": "$15k–$30k",
  "30k-60k": "$30k–$60k",
  "60k-plus": "$60k+",
  "not-sure": "Not sure yet",
};

export const inquiryTimelineLabels: Record<
  (typeof INQUIRY_TIMELINES)[number],
  string
> = {
  "within-6-weeks": "Within 6 weeks",
  "2-3-months": "2–3 months",
  "3-6-months": "3–6 months",
  flexible: "Flexible / exploring",
};
