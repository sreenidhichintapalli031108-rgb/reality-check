import { GoogleGenerativeAI } from '@google/generative-ai'
import { buildAnalysisPrompt } from '../prompts/analysisPrompt.js'
import { AnalysisReportSchema } from '../utils/reportSchema.js'

const PRIMARY_MODEL = 'gemini-3.8-flash'
const FALLBACK_MODEL = 'gemini-1.5-flash'
const MAX_RETRIES = 2
const RETRY_DELAY_MS = 1500

/**
 * Returns true if the error looks like a transient 503 / overload error
 * from the Gemini API.
 */
function is503(err) {
  const msg = err?.message || ''
  const status = err?.status ?? err?.httpErrorCode ?? err?.response?.status
  return (
    status === 503 ||
    msg.includes('503') ||
    msg.toLowerCase().includes('overloaded') ||
    msg.toLowerCase().includes('service unavailable')
  )
}

/**
 * Simple delay helper.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Gemini-based AI analysis service.
 * Implements the shared AI service interface.
 *
 * Retry behaviour:
 *   - On 503, retries the primary model up to MAX_RETRIES times.
 *   - If all retries fail with 503, transparently falls back to FALLBACK_MODEL.
 *   - All other errors are thrown immediately (no retry).
 */
export class GeminiService {
  constructor(apiKey) {
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set in environment variables.')
    this.client = new GoogleGenerativeAI(apiKey)
  }

  /**
   * Analyze text content using Gemini.
   * @param {string} text - The text to analyze
   * @param {string} category - Content category
   * @returns {Promise<object>} Validated report object
   */
  async analyzeText(text, category = 'general') {
    const systemPrompt = buildAnalysisPrompt(category)
    const parts = [
      { text: systemPrompt },
      { text: `\n\nCONTENT TO ANALYZE:\n\n${text}` },
    ]
    const rawText = await this._generateWithFallback(parts)
    return this._parseAndValidate(rawText)
  }

  /**
   * Analyze an image (screenshot) using Gemini Vision.
   * Retries PRIMARY_MODEL up to MAX_RETRIES times on 503. No fallback model.
   * @param {Buffer} imageBuffer - Image data
   * @param {string} mimeType - Image MIME type
   * @param {string} category - Content category
   * @returns {Promise<object>} Validated report object
   */
  async analyzeImage(imageBuffer, mimeType, category = 'general') {
    const systemPrompt = buildAnalysisPrompt(category)
    const parts = [
      { text: systemPrompt },
      { text: '\n\nPlease analyze the content shown in the following image:' },
      { inlineData: { data: imageBuffer.toString('base64'), mimeType } },
    ]

    let lastErr
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const model = this.client.getGenerativeModel({ model: PRIMARY_MODEL })
        const result = await model.generateContent(parts)
        return this._parseAndValidate(result.response.text())
      } catch (err) {
        if (is503(err) && attempt < MAX_RETRIES) {
          console.warn(
            `[GeminiService] Image: ${PRIMARY_MODEL} returned 503 (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${RETRY_DELAY_MS}ms...`
          )
          await delay(RETRY_DELAY_MS)
          lastErr = err
          continue
        }
        throw err
      }
    }
    throw lastErr
  }

  /**
   * Attempts generateContent with the primary model, retrying on 503 up to
   * MAX_RETRIES times. If all retries fail with 503, falls back to FALLBACK_MODEL.
   * Any non-503 error is thrown immediately.
   *
   * @param {Array} parts - Content parts array for generateContent
   * @returns {Promise<string>} Raw text from the model
   */
  async _generateWithFallback(parts) {
    // --- Try primary model with retries ---
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const model = this.client.getGenerativeModel({ model: PRIMARY_MODEL })
        const result = await model.generateContent(parts)
        return result.response.text()
      } catch (err) {
        if (is503(err)) {
          if (attempt < MAX_RETRIES) {
            console.warn(
              `[GeminiService] ${PRIMARY_MODEL} returned 503 (attempt ${attempt + 1}/${MAX_RETRIES}). Retrying in ${RETRY_DELAY_MS}ms...`
            )
            await delay(RETRY_DELAY_MS)
            continue
          }
          // All retries exhausted — fall through to fallback
          console.warn(
            `[GeminiService] ${PRIMARY_MODEL} still unavailable after ${MAX_RETRIES} retries. Falling back to ${FALLBACK_MODEL}.`
          )
          break
        }
        // Non-503 error — surface it immediately
        throw err
      }
    }

    // --- Fallback model (single attempt, no further retry) ---
    try {
      const fallback = this.client.getGenerativeModel({ model: FALLBACK_MODEL })
      const result = await fallback.generateContent(parts)
      console.info(`[GeminiService] Response served by fallback model: ${FALLBACK_MODEL}`)
      return result.response.text()
    } catch (err) {
      throw new Error(
        `Both ${PRIMARY_MODEL} and fallback ${FALLBACK_MODEL} failed. Last error: ${err.message}`
      )
    }
  }

  /**
   * Parse the model's raw text output and validate it against the schema.
   * Handles common issues like markdown code fences.
   * @param {string} rawText
   * @returns {object} Validated report
   */
  _parseAndValidate(rawText) {
    // Strip markdown code blocks if present
    let cleaned = rawText.trim()
    if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()
    }

    let parsed
    try {
      parsed = JSON.parse(cleaned)
    } catch {
      throw new Error(`AI returned non-JSON response. Raw: ${rawText.slice(0, 200)}`)
    }

    // Validate and coerce with Zod
    const result = AnalysisReportSchema.safeParse(parsed)
    if (!result.success) {
      // Attempt a lenient parse — use defaults for missing fields
      const lenient = AnalysisReportSchema.parse({
        overallAssessment: parsed.overallAssessment || {
          label: 'NEEDS_VERIFICATION',
          summary: 'Analysis was partially completed. Please review the available data.',
        },
        claims: parsed.claims || [],
        riskSignals: parsed.riskSignals || [],
        missingInformation: parsed.missingInformation || [],
        recommendedActions: parsed.recommendedActions || [],
        evidence: parsed.evidence || [],
      })
      return lenient
    }

    return result.data
  }
}
