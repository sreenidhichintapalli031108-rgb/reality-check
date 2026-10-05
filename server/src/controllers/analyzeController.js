import { createAIService } from '../services/aiServiceFactory.js'
import { VerificationService } from '../services/verificationService.js'

const verifier = new VerificationService()

/**
 * POST /api/analyze
 *
 * Accepts: multipart/form-data with optional fields:
 *   - text (string)
 *   - image (file)
 *   - url (string)
 *   - category (string)
 */
export async function analyzeHandler(req, res) {
  try {
    const { text = '', url = '', category = 'general' } = req.body
    const imageFile = req.file

    // Validate: at least one input required
    const hasText = text.trim().length >= 10
    const hasImage = !!imageFile
    const hasUrl = url.trim().length > 0

    if (!hasText && !hasImage && !hasUrl) {
      return res.status(400).json({
        error: 'Please provide at least one input: text (min 10 characters), an image, or a URL.',
      })
    }

    // Lazy-initialize AI service (catches missing API key gracefully)
    let aiService
    try {
      aiService = createAIService()
    } catch (err) {
      return res.status(503).json({
        error: `AI service is not configured: ${err.message}. Please set your API key in server/.env.`,
      })
    }

    // Run verification heuristics
    const { notes: verificationNotes } = verifier.checkInput({ text, url })

    let report

    if (hasImage) {
      // Image analysis — use vision model
      report = await aiService.analyzeImage(
        imageFile.buffer,
        imageFile.mimetype,
        category
      )
    } else if (hasText) {
      // Append verification notes to text for additional context
      let enrichedText = text
      if (verificationNotes.length > 0) {
        enrichedText += `\n\n[Automated pre-analysis notes: ${verificationNotes.join(' ')}]`
      }
      report = await aiService.analyzeText(enrichedText, category)
    } else {
      // URL-only: for MVP, ask the AI to analyze the URL as context
      const urlText = `The user submitted this URL for analysis: ${url}\n\n[Note: URL content was not fetched. Analyze what can be inferred from the URL structure only.]`
      report = await aiService.analyzeText(urlText, category)
    }

    return res.json(report)
  } catch (err) {
    console.error('[analyzeHandler] Error:', err)

    // Surface AI-specific errors clearly
    const message = err?.message || 'An unexpected error occurred during analysis.'
    return res.status(500).json({ error: message })
  }
}
