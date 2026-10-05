import { useState, useCallback } from 'react'
import { analyzeContent } from '../services/api'

const LOADING_STEPS = [
  'Extracting information...',
  'Identifying claims...',
  'Checking consistency...',
  'Evaluating risk signals...',
  'Preparing your verification report...',
]

/**
 * Manages the analysis flow: input → loading → result/error.
 */
export function useAnalysis() {
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [report, setReport] = useState(null)
  const [error, setError] = useState(null)
  const [loadingStep, setLoadingStep] = useState(0)

  const analyze = useCallback(async (input) => {
    setStatus('loading')
    setReport(null)
    setError(null)
    setLoadingStep(0)

    // Cycle through loading steps while the request is in flight
    let step = 0
    const stepInterval = setInterval(() => {
      step = Math.min(step + 1, LOADING_STEPS.length - 1)
      setLoadingStep(step)
    }, 1800)

    try {
      const result = await analyzeContent(input)
      clearInterval(stepInterval)
      setLoadingStep(LOADING_STEPS.length - 1)
      setReport(result)
      setStatus('success')
    } catch (err) {
      clearInterval(stepInterval)
      const message =
        err?.response?.data?.error ||
        err?.message ||
        'Something went wrong. Please try again.'
      setError(message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setReport(null)
    setError(null)
    setLoadingStep(0)
  }, [])

  return {
    status,
    report,
    error,
    loadingStep,
    loadingSteps: LOADING_STEPS,
    analyze,
    reset,
  }
}
