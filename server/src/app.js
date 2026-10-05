import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.js'
import analyzeRouter from './routes/analyze.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

// CORS — allow the Vite dev client and configured client URL
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))

app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ extended: true, limit: '1mb' }))

// Routes
app.use('/api/health', healthRouter)
app.use('/api/analyze', analyzeRouter)

// Error handling (must be last)
app.use(notFoundHandler)
app.use(errorHandler)

export default app
