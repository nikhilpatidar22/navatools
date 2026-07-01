import { useState, useCallback } from 'react'
import toast from 'react-hot-toast'

export function useAIResponse() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [data, setData] = useState(null)

  const generate = useCallback(async ({ prompt, systemPrompt }) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, systemPrompt }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'AI request failed')
      }
      const result = await res.json()
      setData(result.data)
      return result.data
    } catch (err) {
      const msg = err.message || 'Something went wrong. Please try again.'
      setError(msg)
      toast.error(msg)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  return { generate, loading, error, data, setData }
}
