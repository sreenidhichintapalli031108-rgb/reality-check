/**
 * Verification service.
 *
 * For MVP, performs lightweight consistency checks on extracted data.
 * Designed to be extended with real external verification sources later.
 *
 * IMPORTANT: Never present model knowledge as live verification.
 * All checks here are heuristic, not authoritative.
 */
export class VerificationService {
  /**
   * Run basic consistency checks on the input.
   * Returns additional flags that can inform the AI analysis.
   *
   * @param {{ text?: string, url?: string }} input
   * @returns {object} Verification notes
   */
  checkInput(input) {
    const notes = []

    if (input.text) {
      notes.push(...this._checkText(input.text))
    }

    if (input.url) {
      notes.push(...this._checkUrl(input.url))
    }

    return { notes }
  }

  /**
   * Basic heuristic checks on text content.
   */
  _checkText(text) {
    const notes = []
    const lower = text.toLowerCase()

    // Check for free email provider used as official contact
    const freeEmailPattern = /@(gmail|yahoo|hotmail|outlook|rediffmail)\./i
    if (freeEmailPattern.test(text)) {
      notes.push('Free email provider detected in contact information (e.g., Gmail, Yahoo).')
    }

    // Urgency language
    const urgencyTerms = ['within 24 hours', 'within 48 hours', 'act now', 'limited time', 'expires today', 'hurry']
    if (urgencyTerms.some((t) => lower.includes(t))) {
      notes.push('Urgent deadline language detected.')
    }

    // Payment request patterns
    const paymentTerms = ['registration fee', 'processing fee', 'security deposit', 'advance payment', 'pay to confirm']
    if (paymentTerms.some((t) => lower.includes(t))) {
      notes.push('Upfront payment request detected.')
    }

    return notes
  }

  /**
   * Basic checks on a provided URL.
   */
  _checkUrl(url) {
    const notes = []
    try {
      const parsed = new URL(url)

      // Flag non-HTTPS
      if (parsed.protocol !== 'https:') {
        notes.push('URL does not use HTTPS.')
      }

      // Flag suspicious TLDs often used in fraud
      const suspiciousTlds = ['.xyz', '.tk', '.cf', '.gq', '.ml']
      if (suspiciousTlds.some((tld) => parsed.hostname.endsWith(tld))) {
        notes.push('URL uses an uncommon domain extension.')
      }
    } catch {
      notes.push('Provided URL could not be parsed.')
    }
    return notes
  }
}
