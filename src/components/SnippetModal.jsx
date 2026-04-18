import React, { useState, useEffect } from 'react'
import { analyzeSnippet } from '../utils/ai'
import { LANGUAGES, LANG_META } from '../utils/languages'

export default function SnippetModal({ snippet, onSave, onClose }) {
  const editing = !!snippet?.id

  const [title, setTitle] = useState(snippet?.title || '')
  const [lang, setLang] = useState(snippet?.lang || 'javascript')
  const [code, setCode] = useState(snippet?.code || '')
  const [tags, setTags] = useState(snippet?.tags?.join(', ') || '')
  const [explain, setExplain] = useState(snippet?.explain || '')
  const [aiStatus, setAiStatus] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  async function handleAI() {
    if (!code.trim()) { setAiStatus('Paste some code first!'); return }
    setAiLoading(true)
    setAiStatus('Claude is analysing your snippet...')
    try {
      const result = await analyzeSnippet(code, lang)
      if (result.title) setTitle(result.title)
      if (result.tags) setTags(result.tags.join(', '))
      if (result.explain) setExplain(result.explain)
      setAiStatus('Done! Review and save.')
    } catch {
      setAiStatus('AI unavailable — fill in manually.')
    }
    setAiLoading(false)
  }

  function handleSave() {
    if (!code.trim()) return
    onSave({
      ...(editing ? { id: snippet.id, createdAt: snippet.createdAt } : {}),
      title: title.trim() || 'Untitled',
      lang,
      code: code.trim(),
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      explain: explain.trim(),
    })
    onClose()
  }

  const input = {
    width: '100%', padding: '9px 12px',
    background: '#0e0f11', border: '1px solid rgba(255,255,255,0.14)',
    borderRadius: 'var(--radius)', color: 'var(--text)',
    fontFamily: 'var(--sans)', fontSize: 13, outline: 'none',
  }

  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)',
        zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20,
      }}
    >
      <div style={{
        background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 'var(--radius-lg)', padding: 24, width: '100%',
        maxWidth: 560, maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', marginBottom: 20 }}>
          {editing ? 'Edit snippet' : 'New snippet'}
        </div>

        {/* Title */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 5 }}>Title</label>
          <input style={input} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Debounce function" />
        </div>

        {/* Language */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 5 }}>Language</label>
          <select style={{ ...input, cursor: 'pointer' }} value={lang} onChange={e => setLang(e.target.value)}>
            {LANGUAGES.map(l => (
              <option key={l} value={l} style={{ background: 'var(--surface)' }}>
                {LANG_META[l].label} — {l.charAt(0).toUpperCase() + l.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Code */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 5 }}>Code</label>
          <textarea
            style={{ ...input, fontFamily: 'var(--mono)', minHeight: 120, resize: 'vertical', lineHeight: 1.65 }}
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Paste your code here..."
          />
        </div>

        {/* AI row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
          <button
            onClick={handleAI}
            disabled={aiLoading}
            style={{
              height: 36, padding: '0 16px',
              background: 'rgba(79,127,255,0.12)', color: 'var(--accent)',
              border: '1px solid rgba(79,127,255,0.35)', borderRadius: 'var(--radius)',
              fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700,
              cursor: aiLoading ? 'default' : 'pointer', opacity: aiLoading ? 0.6 : 1,
              display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
              <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"/>
            </svg>
            {aiLoading ? 'Analysing...' : 'Auto-fill with AI'}
          </button>
          {aiStatus && (
            <span style={{ fontSize: 12, color: 'var(--muted)', fontStyle: 'italic', flex: 1 }}>{aiStatus}</span>
          )}
        </div>

        {/* Tags */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 5 }}>Tags (comma separated)</label>
          <input style={input} value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. utility, async, react" />
        </div>

        {/* Explanation */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--muted)', marginBottom: 5 }}>AI explanation</label>
          <textarea
            style={{ ...input, minHeight: 72, resize: 'vertical', lineHeight: 1.6 }}
            value={explain}
            onChange={e => setExplain(e.target.value)}
            placeholder="Will appear after AI analysis, or write your own..."
          />
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button onClick={onClose} style={{
            height: 36, padding: '0 16px', background: 'transparent',
            border: '1px solid rgba(255,255,255,0.14)', borderRadius: 'var(--radius)',
            color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 13, cursor: 'pointer',
          }}>Cancel</button>
          <button onClick={handleSave} style={{
            height: 36, padding: '0 20px', background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius)',
            fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            {editing ? 'Update snippet' : 'Save snippet'}
          </button>
        </div>
      </div>
    </div>
  )
}
