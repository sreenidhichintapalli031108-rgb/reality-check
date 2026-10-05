import { z } from 'zod'

export const ClaimSchema = z.object({
  claim: z.string(),
  category: z.string().default('general'),
  status: z.enum(['SUPPORTED', 'UNVERIFIED', 'CONTRADICTED']).default('UNVERIFIED'),
  reason: z.string().default(''),
})

export const RiskSignalSchema = z.object({
  signal: z.string(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  reason: z.string().default(''),
})

export const RecommendedActionSchema = z.object({
  action: z.string(),
  priority: z.enum(['HIGH', 'MEDIUM', 'LOW']).default('MEDIUM'),
})

export const EvidenceSchema = z.object({
  source: z.string(),
  url: z.string().default('N/A'),
  supports: z.string().default(''),
  type: z.enum(['OFFICIAL', 'USER_PROVIDED', 'OTHER']).default('OTHER'),
})

export const AnalysisReportSchema = z.object({
  overallAssessment: z.object({
    label: z.enum(['LOW_CONCERN', 'NEEDS_VERIFICATION', 'HIGH_CAUTION']),
    summary: z.string(),
  }),
  claims: z.array(ClaimSchema).default([]),
  riskSignals: z.array(RiskSignalSchema).default([]),
  missingInformation: z.array(z.string()).default([]),
  recommendedActions: z.array(RecommendedActionSchema).default([]),
  evidence: z.array(EvidenceSchema).default([]),
})
