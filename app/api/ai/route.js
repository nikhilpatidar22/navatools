import { generateAIResponse } from '@/lib/ai/service'

export async function POST(request) {
  try {
    const { prompt, systemPrompt, model, provider } = await request.json()

    if (!prompt || typeof prompt !== 'string') {
      return Response.json({ error: 'Prompt is required' }, { status: 400 })
    }

    if (prompt.length > 100000) {
      return Response.json({ error: 'Prompt too long' }, { status: 400 })
    }

    const result = await generateAIResponse({ prompt, systemPrompt, model, provider })

    return Response.json(result)
  } catch (error) {
    console.error('AI API Error:', error.message)
    return Response.json(
      { error: error.message || 'AI service error. Please check your API key configuration.' },
      { status: 500 }
    )
  }
}
