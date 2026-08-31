import type {
  ApplicationStatus,
  OpportunityStatus,
  RejectionReason,
  RewardStatus,
} from "../generated/prisma/client";

export const OPPORTUNITY_STATUS_LABELS: Record<OpportunityStatus, string> = {
  SUBMITTED: "Submitted",
  UNDER_REVIEW: "Under Review",
  REJECTED: "Rejected",
  VERIFIED: "Verified",
  MATCHED: "Matched",
  APPLICATION_SUBMITTED: "Application Submitted",
  INTERVIEW: "Interview",
  PLACEMENT_CONFIRMED: "Placement Confirmed",
  CLOSED: "Closed",
};

export const REWARD_STATUS_LABELS: Record<RewardStatus, string> = {
  NOT_ELIGIBLE: "Not Eligible",
  PENDING: "Pending",
  PAYABLE: "Payable",
  PAID: "Paid",
};

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> = {
  NOT_STARTED: "Not Started",
  SUBMITTED: "Submitted",
  REJECTED: "Rejected",
  SHORTLISTED: "Shortlisted",
  INTERVIEW: "Interview",
  SELECTED: "Selected",
  WITHDRAWN: "Withdrawn",
};

export const REJECTION_REASON_LABELS: Record<RejectionReason, string> = {
  FAKE_UNVERIFIABLE: "Fake / Unverifiable",
  EXPIRED: "Expired",
  DUPLICATE: "Duplicate",
  INSUFFICIENT_INFORMATION: "Insufficient Information",
  NOT_RELEVANT: "Not Relevant",
  OTHER: "Other",
};

export const OPPORTUNITY_STATUS_FLOW: OpportunityStatus[] = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "REJECTED",
  "VERIFIED",
  "MATCHED",
  "APPLICATION_SUBMITTED",
  "INTERVIEW",
  "PLACEMENT_CONFIRMED",
  "CLOSED",
];

export const APPLICATION_STATUS_FLOW: ApplicationStatus[] = [
  "NOT_STARTED",
  "SUBMITTED",
  "REJECTED",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "WITHDRAWN",
];

export const REJECTION_REASONS: RejectionReason[] = [
  "FAKE_UNVERIFIABLE",
  "EXPIRED",
  "DUPLICATE",
  "INSUFFICIENT_INFORMATION",
  "NOT_RELEVANT",
  "OTHER",
];

export const REWARD_FLOW: RewardStatus[] = [
  "NOT_ELIGIBLE",
  "PENDING",
  "PAYABLE",
  "PAID",
];
