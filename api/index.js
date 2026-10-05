/**
 * Vercel Serverless Function entry point.
 * Wraps the existing Express app — no changes to routes or logic.
 */
import 'dotenv/config'
import app from '../server/src/app.js'

export default app
