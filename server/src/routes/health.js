import { Router } from 'express'

const router = Router()

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'Reality Check API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    aiProvider: process.env.AI_PROVIDER || 'gemini',
    apiKeyConfigured: !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'),
  })
})

export default router
