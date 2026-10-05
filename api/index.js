/**
 * Vercel Serverless Function entry point.
 * Wraps the existing Express app — no changes to routes or logic.
 *
 * Note: dotenv is NOT imported here. On Vercel, environment variables are
 * injected by the platform directly. For local dev, the server is started
 * via server/src/server.js which imports dotenv/config.
 */
import app from '../server/src/app.js'

export default app
