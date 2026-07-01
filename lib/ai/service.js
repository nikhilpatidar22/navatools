import providers from './providers/index.js'

const PROVIDER_ORDER = ['groq', 'openai', 'gemini', 'claude', 'deepseek', 'ollama', 'openrouter']

function getActiveProvider() {
  const configured = process.env.AI_PROVIDER?.toLowerCase()
  if (configured && providers[configured] && process.env[`${configured.toUpperCase()}_API_KEY`]) {
    return configured
  }
  for (const name of PROVIDER_ORDER) {
    const keyName = `${name.toUpperCase()}_API_KEY`
    if (process.env[keyName]) return name
  }
  return null
}

export async function generateAIResponse({ prompt, systemPrompt, model, provider }) {
  const activeProvider = provider || getActiveProvider()
  if (!activeProvider) {
    throw new Error('No AI provider configured. Set GROQ_API_KEY or another provider key in environment variables.')
  }
  const providerFn = providers[activeProvider]
  if (!providerFn) {
    throw new Error(`AI provider "${activeProvider}" not found. Available: ${Object.keys(providers).join(', ')}`)
  }

  const messages = []
  if (systemPrompt) {
    messages.push({ role: 'system', content: systemPrompt })
  }
  messages.push({ role: 'user', content: prompt })

  try {
    const response = await providerFn({ messages, model })
    return { success: true, data: response, provider: activeProvider }
  } catch (error) {
    console.error(`AI provider "${activeProvider}" failed:`, error.message)
    throw error
  }
}

export { providers }
