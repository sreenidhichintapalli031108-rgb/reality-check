/**
 * Global error handler middleware.
 * Catches errors from multer, express, and unhandled route errors.
 */
export function errorHandler(err, _req, res, _next) {
  console.error('[ErrorHandler]', err.message)

  // Multer-specific errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'File is too large. Maximum size is 10 MB.' })
  }
  if (err.message?.startsWith('Unsupported file type')) {
    return res.status(400).json({ error: err.message })
  }

  // Generic error
  const status = err.status || err.statusCode || 500
  const message = err.message || 'Internal server error.'

  res.status(status).json({ error: message })
}

/**
 * 404 handler for undefined routes.
 */
export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route not found: ${req.method} ${req.path}`,
  })
}
