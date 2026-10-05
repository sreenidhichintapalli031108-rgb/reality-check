import { GeminiService } from './geminiService.js'

/**
 * Factory that returns the configured AI service.
 * Add new providers here without changing any other code.
 *
 * @returns {GeminiService} The configured AI service instance
 */
export function createAIService() {
  const provider = process.env.AI_PROVIDER || 'gemini'

  switch (provider.toLowerCase()) {
    case 'gemini':
      return new GeminiService(process.env.GEMINI_API_KEY)

    // Future: case 'openai': return new OpenAIService(process.env.OPENAI_API_KEY)

    default:
      throw new Error(`Unknown AI provider: "${provider}". Set AI_PROVIDER in .env (e.g., gemini).`)
  }
}
