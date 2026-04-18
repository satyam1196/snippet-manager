import { useState, useEffect } from 'react'

const SEED = [
  {
    id: 1, title: 'Debounce function', lang: 'javascript',
    code: `function debounce(fn, delay) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}`,
    tags: ['utility', 'async', 'performance'],
    explain: 'Delays invoking a function until after a wait time, resetting on each call. Ideal for search inputs and resize handlers.',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 2, title: 'Flatten nested list', lang: 'python',
    code: `def flatten(lst):\n    return [\n        item for sub in lst\n        for item in (\n            flatten(sub) if isinstance(sub, list)\n            else [sub]\n        )\n    ]`,
    tags: ['recursion', 'list', 'utility'],
    explain: 'Recursively flattens a deeply nested list using list comprehension.',
    createdAt: Date.now() - 86400000 * 2,
  },
  {
    id: 3, title: 'Batch fetch with rate limit', lang: 'typescript',
    code: `async function batchFetch<T>(urls: string[], limit = 3): Promise<T[]> {\n  const results: T[] = [];\n  for (let i = 0; i < urls.length; i += limit) {\n    const batch = urls.slice(i, i + limit);\n    const res = await Promise.all(batch.map(u => fetch(u).then(r => r.json())));\n    results.push(...res);\n  }\n  return results;\n}`,
    tags: ['async', 'fetch', 'rate-limit', 'typescript'],
    explain: 'Fetches URLs in controlled batches to avoid rate-limiting APIs.',
    createdAt: Date.now() - 86400000,
  },
]

let _nextId = 4

export function useSnippets() {
  const [snippets, setSnippets] = useState(() => {
    try {
      const stored = localStorage.getItem('snipvault_v2')
      if (stored) {
        const parsed = JSON.parse(stored)
        _nextId = Math.max(...parsed.map(s => s.id), 0) + 1
        return parsed
      }
    } catch {}
    return SEED
  })

  useEffect(() => {
    localStorage.setItem('snipvault_v2', JSON.stringify(snippets))
  }, [snippets])

  function addSnippet(data) {
    const s = { ...data, id: _nextId++, createdAt: Date.now() }
    setSnippets(prev => [s, ...prev])
    return s
  }

  function updateSnippet(id, data) {
    setSnippets(prev => prev.map(s => s.id === id ? { ...s, ...data } : s))
  }

  function deleteSnippet(id) {
    setSnippets(prev => prev.filter(s => s.id !== id))
  }

  function importSnippets(incoming) {
    const merged = [...incoming.map(s => ({ ...s, id: _nextId++ })), ...snippets]
    setSnippets(merged)
  }

  return { snippets, addSnippet, updateSnippet, deleteSnippet, importSnippets }
}
