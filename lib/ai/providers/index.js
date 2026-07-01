const providers = {
  groq: async ({ messages, model }) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'mixtral-8x7b-32768',
        messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    })
    if (!response.ok) throw new Error(`Groq API error: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },

  openai: async ({ messages, model }) => {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'gpt-4o-mini',
        messages,
        temperature: 0.7,
      }),
    })
    if (!response.ok) throw new Error(`OpenAI API error: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },

  gemini: async ({ messages, model }) => {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model || 'gemini-pro'}:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages.map(m => ({ role: m.role === 'assistant' ? 'model' : 'user', parts: [{ text: m.content }] })),
      }),
    })
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`)
    const data = await response.json()
    return data.candidates[0].content.parts[0].text
  },

  claude: async ({ messages, model }) => {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: model || 'claude-3-haiku-20240307',
        max_tokens: 4096,
        messages: messages.filter(m => m.role !== 'system'),
        system: messages.find(m => m.role === 'system')?.content,
      }),
    })
    if (!response.ok) throw new Error(`Claude API error: ${response.status}`)
    const data = await response.json()
    return data.content[0].text
  },

  deepseek: async ({ messages, model }) => {
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'deepseek-chat',
        messages,
        temperature: 0.7,
      }),
    })
    if (!response.ok) throw new Error(`DeepSeek API error: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },

  ollama: async ({ messages, model }) => {
    const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434'
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model || 'llama3',
        messages,
        stream: false,
      }),
    })
    if (!response.ok) throw new Error(`Ollama API error: ${response.status}`)
    const data = await response.json()
    return data.message.content
  },

  openrouter: async ({ messages, model }) => {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: model || 'mistralai/mistral-7b-instruct',
        messages,
      }),
    })
    if (!response.ok) throw new Error(`OpenRouter API error: ${response.status}`)
    const data = await response.json()
    return data.choices[0].message.content
  },
}

export default providers
