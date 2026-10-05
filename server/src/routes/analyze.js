import { Router } from 'express'
import multer from 'multer'
import { analyzeHandler } from '../controllers/analyzeController.js'

const router = Router()

// Store uploads in memory (no disk writes needed for MVP)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (allowed.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error(`Unsupported file type: ${file.mimetype}. Allowed: JPG, PNG, WebP, GIF`))
    }
  },
})

router.post('/', upload.single('image'), analyzeHandler)

export default router
