/**
 * Pre-generated demo reports for Reality Check Demo Mode.
 *
 * These reports match the exact AnalysisReport schema returned by the backend.
 * They are used ONLY for frontend demonstration — no API request is made.
 *
 * IMPORTANT: These are illustrative examples, not real-world verified data.
 * Do not present them as live AI analysis results.
 */

export const demoReports = [
  // ─────────────────────────────────────────────────────────────────
  // DEMO 1 — Suspicious Internship (High Caution)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-suspicious-internship',
    label: 'Internship with Fee',
    emoji: '🚨',
    description: 'An internship offer requesting an upfront payment',
    inputSummary: '"Pay a refundable registration fee of ₹1,999 to confirm your work-from-home internship."',
    report: {
      overallAssessment: {
        label: 'HIGH_CAUTION',
        summary:
          'This message contains several patterns commonly associated with fraudulent internship offers: an upfront payment requirement, urgency language, informal communication channels, and a complete absence of verifiable organization details. None of the core claims can be independently verified from the content provided. Proceed with significant caution and do not make any payment until the organization and offer have been thoroughly verified through official channels.',
      },
      claims: [
        {
          claim: 'The recipient has been selected for a work-from-home internship',
          category: 'organization',
          status: 'UNVERIFIED',
          reason:
            'No organization name, official contact, or application reference is provided. The selection claim cannot be verified.',
        },
        {
          claim: 'Monthly stipend of ₹25,000',
          category: 'compensation',
          status: 'UNVERIFIED',
          reason:
            'No supporting documentation, official offer letter, or independent source confirms this figure.',
        },
        {
          claim: '₹1,999 registration fee is refundable',
          category: 'payment',
          status: 'UNVERIFIED',
          reason:
            'The refund claim is made by the sender with no supporting terms, policy document, or official reference.',
        },
        {
          claim: 'Limited seats available — immediate payment required',
          category: 'condition',
          status: 'UNVERIFIED',
          reason:
            'This is an urgency/scarcity claim made solely by the sender. No independent evidence supports it.',
        },
      ],
      riskSignals: [
        {
          signal: 'Upfront payment requested before any work begins',
          severity: 'HIGH',
          reason:
            'Legitimate internships and employment opportunities do not require candidates to pay registration or security fees. Requesting payment to "confirm a seat" is a well-known pattern in fraudulent offers.',
        },
        {
          signal: 'Urgency and scarcity language ("limited seats", "immediately")',
          severity: 'HIGH',
          reason:
            'Pressure tactics designed to prevent the recipient from taking time to independently verify the offer are a common feature of fraudulent messages.',
        },
        {
          signal: 'Informal communication channel — WhatsApp requested for payment confirmation',
          severity: 'HIGH',
          reason:
            'Legitimate organizations communicate through official email domains and documented processes. Routing financial transactions through WhatsApp bypasses any formal record or accountability.',
        },
        {
          signal: 'No organization name, official email, or contact details provided',
          severity: 'MEDIUM',
          reason:
            'The complete absence of identifiable organization information makes independent verification impossible.',
        },
      ],
      missingInformation: [
        'Legal name and registration of the organization',
        'Official company website and corporate email domain',
        'Specific job role, responsibilities, and internship duration',
        'A formal, signed offer letter on official letterhead',
        'Verifiable contact information (office address, official phone number)',
        'Written terms and conditions for the claimed fee refund',
        'Reference to the original application or interview process',
      ],
      recommendedActions: [
        {
          action:
            'Do not transfer any money until the organization, offer, and payment requirement have been independently verified through official channels.',
          priority: 'HIGH',
        },
        {
          action:
            'Search for the organization by name using official sources. Verify it is registered with the relevant authority (e.g., MCA in India).',
          priority: 'HIGH',
        },
        {
          action:
            'Contact the organization only through contact information found on its official website — not the WhatsApp number or email provided in this message.',
          priority: 'HIGH',
        },
        {
          action:
            'Request a formal offer letter on official letterhead before taking any further steps.',
          priority: 'MEDIUM',
        },
        {
          action:
            'If you did not apply for this internship, treat the unsolicited contact as a significant additional warning.',
          priority: 'MEDIUM',
        },
      ],
      evidence: [
        {
          source: 'Content submitted by user',
          url: 'N/A',
          supports: 'All claims and risk signals identified in this report are derived from the submitted message text.',
          type: 'USER_PROVIDED',
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // DEMO 2 — Standard Internship Offer (Needs Verification)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-standard-internship',
    label: 'Standard Internship',
    emoji: '🟡',
    description: 'A normal-looking internship offer with no obvious red flags',
    inputSummary: '"2-month Software Development Internship at ABC Technologies. No payment required."',
    report: {
      overallAssessment: {
        label: 'NEEDS_VERIFICATION',
        summary:
          'This offer does not contain obvious red flags such as upfront payment requests or urgency language. However, several key claims — including the organization\'s legitimacy, the stipend, and the certificate — cannot be confirmed from the message alone. Standard independent verification is recommended before committing.',
      },
      claims: [
        {
          claim: 'No payment is required to participate in the internship',
          category: 'payment',
          status: 'SUPPORTED',
          reason:
            'The message explicitly states no payment is required. This is consistent with legitimate internship practice and does not contradict any other information in the content.',
        },
        {
          claim: 'Internship is at ABC Technologies',
          category: 'organization',
          status: 'UNVERIFIED',
          reason:
            'The organization name is provided but cannot be independently verified from the message content alone. No website, official email domain, or registration reference is included.',
        },
        {
          claim: '2-month Software Development Internship with mentorship and weekly assignments',
          category: 'duration',
          status: 'UNVERIFIED',
          reason:
            'Duration and structure are stated but not supported by any formal documentation such as an offer letter or official programme page.',
        },
        {
          claim: 'Certificate of completion provided upon successful completion',
          category: 'condition',
          status: 'UNVERIFIED',
          reason:
            'The certificate claim is made by the sender. No issuing body, accreditation, or official reference is provided to confirm the certificate\'s validity.',
        },
      ],
      riskSignals: [
        {
          signal: 'Organization identity not independently verifiable from the message',
          severity: 'LOW',
          reason:
            'While the company name is given, no official website, registered domain, or verifiable contact information was provided.',
        },
        {
          signal: 'Certificate claim lacks issuing authority or accreditation details',
          severity: 'LOW',
          reason:
            'Certificates from unregistered organizations may have limited professional value. Verifying the issuing body is advisable.',
        },
      ],
      missingInformation: [
        'Official company website and corporate email domain',
        'Company registration or LinkedIn presence for ABC Technologies',
        'Stipend or compensation details (none mentioned)',
        'Name and contact details of the hiring manager or HR contact',
        'Formal offer letter or programme documentation',
        'Details of the certificate — issuing body and whether it is industry-recognized',
      ],
      recommendedActions: [
        {
          action:
            'Search for ABC Technologies independently and verify through its official website or LinkedIn page before responding.',
          priority: 'HIGH',
        },
        {
          action:
            'Confirm the sender\'s email domain matches the official company domain — not a free email provider.',
          priority: 'HIGH',
        },
        {
          action:
            'Request a formal offer letter or programme document from the official company email before committing.',
          priority: 'MEDIUM',
        },
        {
          action:
            'Clarify whether any stipend or compensation is provided, since none is mentioned in the offer.',
          priority: 'MEDIUM',
        },
        {
          action:
            'Verify the value and recognition of the certificate before treating it as a career credential.',
          priority: 'LOW',
        },
      ],
      evidence: [
        {
          source: 'Content submitted by user',
          url: 'N/A',
          supports: 'All claims identified in this report are derived directly from the submitted message.',
          type: 'USER_PROVIDED',
        },
      ],
    },
  },

  // ─────────────────────────────────────────────────────────────────
  // DEMO 3 — Course Advertisement (Needs Verification)
  // ─────────────────────────────────────────────────────────────────
  {
    id: 'demo-course-advertisement',
    label: 'Course Advertisement',
    emoji: '📚',
    description: 'A course offer with multiple unverified claims and limited-time pricing',
    inputSummary: '"Master Data Science in 30 Days — 100% placement guarantee, ₹9,999 (limited offer)."',
    report: {
      overallAssessment: {
        label: 'NEEDS_VERIFICATION',
        summary:
          'This advertisement makes several strong claims — including a job placement guarantee, a dramatic discount, and instructor credentials — that are not independently supported by the content provided. The limited-time pricing and guarantee language require careful verification before enrolment. No payment request is immediately suspicious, but the unverified claims warrant scrutiny.',
      },
      claims: [
        {
          claim: '100% job placement guarantee for all students',
          category: 'condition',
          status: 'UNVERIFIED',
          reason:
            'Placement guarantees are significant commitments. No contractual terms, success-rate data, or independent verification is provided in the advertisement.',
        },
        {
          claim: 'Course duration: 30 days',
          category: 'duration',
          status: 'UNVERIFIED',
          reason:
            'Duration is stated but not supported by a syllabus, official programme page, or accreditation body.',
        },
        {
          claim: 'Original price ₹49,999 discounted to ₹9,999 for a limited time',
          category: 'compensation',
          status: 'UNVERIFIED',
          reason:
            'The original price and discount are stated by the advertiser only. No independent pricing history or market comparison is available.',
        },
        {
          claim: 'Taught by industry-expert instructors',
          category: 'organization',
          status: 'UNVERIFIED',
          reason:
            'No instructor names, professional profiles, or credentials are provided to support the "industry expert" claim.',
        },
        {
          claim: 'Certificate of completion issued upon finishing the course',
          category: 'condition',
          status: 'UNVERIFIED',
          reason:
            'The certificate is mentioned without details about the issuing body, industry recognition, or accreditation.',
        },
      ],
      riskSignals: [
        {
          signal: 'Absolute placement guarantee ("100%") with no supporting terms',
          severity: 'MEDIUM',
          reason:
            'Unconditional placement guarantees are rarely fulfilled as advertised. The absence of any terms, conditions, or refund policy for non-placement is a concern.',
        },
        {
          signal: 'Significant claimed discount with no independent price history',
          severity: 'LOW',
          reason:
            'A large stated discount (₹49,999 → ₹9,999) creates urgency but cannot be verified without independent pricing evidence.',
        },
        {
          signal: 'No instructor names or verifiable credentials provided',
          severity: 'LOW',
          reason:
            'Instructor credibility is a key factor in course quality. Anonymous "expert" claims cannot be evaluated.',
        },
      ],
      missingInformation: [
        'Full name and registration details of the institution offering the course',
        'Official course page or syllabus with detailed curriculum',
        'Instructor names, professional profiles, or credentials',
        'Written placement guarantee terms — what qualifies, what happens if placement fails',
        'Accreditation or recognition of the certificate by employers or professional bodies',
        'Alumni reviews or independently verifiable success statistics',
        'Refund policy if the course does not meet advertised expectations',
      ],
      recommendedActions: [
        {
          action:
            'Search for the institution independently and verify it through official sources before making any payment.',
          priority: 'HIGH',
        },
        {
          action:
            'Request the full written terms of the placement guarantee — including what qualifies as "placement" and the remedy if it is not fulfilled.',
          priority: 'HIGH',
        },
        {
          action:
            'Look for independent reviews of this course on platforms such as Google, Reddit, or Trustpilot before enrolling.',
          priority: 'HIGH',
        },
        {
          action:
            'Verify instructor credentials by searching their names on LinkedIn or other professional networks.',
          priority: 'MEDIUM',
        },
        {
          action:
            'Confirm whether the certificate is recognized by employers in your target industry before treating it as a career credential.',
          priority: 'MEDIUM',
        },
        {
          action:
            'Do not be pressured by the limited-time discount into enrolling before you have completed your verification.',
          priority: 'MEDIUM',
        },
      ],
      evidence: [
        {
          source: 'Content submitted by user',
          url: 'N/A',
          supports: 'All claims and risk signals identified in this report are derived from the submitted advertisement text.',
          type: 'USER_PROVIDED',
        },
      ],
    },
  },
]
