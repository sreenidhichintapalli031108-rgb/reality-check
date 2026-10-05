import express from 'express'
import cors from 'cors'
import healthRouter from './routes/health.js'
import analyzeRouter from './routes/analyze.js'
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js'

const app = express()

// CORS — allow local dev, configured CLIENT_URL, and Vercel deployments
const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
  // Vercel preview and production URLs
  process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
].filter(Boolean)

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (server-to-server, curl, Postman)
    if (!origin) return callback(null, true)
    // Allow any vercel.app subdomain
    if (origin.endsWith('.vercel.app') || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    callback(new Error(`CORS: origin ${origin} not allowed`))
  },
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
