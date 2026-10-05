/**
 * @typedef {'LOW_CONCERN' | 'NEEDS_VERIFICATION' | 'HIGH_CAUTION'} AssessmentLabel
 * @typedef {'SUPPORTED' | 'UNVERIFIED' | 'CONTRADICTED'} ClaimStatus
 * @typedef {'LOW' | 'MEDIUM' | 'HIGH'} Severity
 * @typedef {'OFFICIAL' | 'USER_PROVIDED' | 'OTHER'} EvidenceType
 */

/**
 * @typedef {Object} OverallAssessment
 * @property {AssessmentLabel} label
 * @property {string} summary
 */

/**
 * @typedef {Object} Claim
 * @property {string} claim
 * @property {string} category
 * @property {ClaimStatus} status
 * @property {string} reason
 */

/**
 * @typedef {Object} RiskSignal
 * @property {string} signal
 * @property {Severity} severity
 * @property {string} reason
 */

/**
 * @typedef {Object} RecommendedAction
 * @property {string} action
 * @property {Severity} priority
 */

/**
 * @typedef {Object} Evidence
 * @property {string} source
 * @property {string} url
 * @property {string} supports
 * @property {EvidenceType} type
 */

/**
 * @typedef {Object} AnalysisReport
 * @property {OverallAssessment} overallAssessment
 * @property {Claim[]} claims
 * @property {RiskSignal[]} riskSignals
 * @property {string[]} missingInformation
 * @property {RecommendedAction[]} recommendedActions
 * @property {Evidence[]} evidence
 */

export {}
