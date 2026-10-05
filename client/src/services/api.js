import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 60000, // AI calls can take time
})

/**
 * Submit content for analysis.
 * @param {{ text?: string, imageFile?: File, url?: string, category?: string }} input
 * @returns {Promise<import('../types/report').AnalysisReport>}
 */
export async function analyzeContent(input) {
  const formData = new FormData()

  if (input.text) {
    formData.append('text', input.text)
  }

  if (input.imageFile) {
    formData.append('image', input.imageFile)
  }

  if (input.url) {
    formData.append('url', input.url)
  }

  if (input.category) {
    formData.append('category', input.category)
  }

  const response = await api.post('/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return response.data
}

/**
 * Check if the backend is up.
 */
export async function checkHealth() {
  const response = await api.get('/health')
  return response.data
}
