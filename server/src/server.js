import 'dotenv/config'
import app from './app.js'

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`\n🛡️  Reality Check API running on http://localhost:${PORT}`)
  console.log(`   Health check: http://localhost:${PORT}/api/health`)
  console.log(`   AI Provider:  ${process.env.AI_PROVIDER || 'gemini'}`)
  const keySet = process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here'
  console.log(`   API Key:      ${keySet ? '✅ configured' : '⚠️  NOT SET — add GEMINI_API_KEY to server/.env'}`)
  console.log('')
})
