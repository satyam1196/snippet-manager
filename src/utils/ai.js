export async function analyzeSnippet(code, lang) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Analyze this ${lang} code snippet. Return ONLY a JSON object, no markdown, no backticks, no explanation:
{
  "title": "short descriptive name (max 5 words)",
  "tags": ["tag1", "tag2", "tag3"],
  "explain": "one clear sentence: what it does and when to use it"
}

Code:
${code}`,
      }],
    }),
  })

  if (!response.ok) throw new Error('API error')
  const data = await response.json()
  const text = (data.content || []).map(c => c.text || '').join('')
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean)
}
