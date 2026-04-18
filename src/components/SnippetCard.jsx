import React, { useEffect, useRef, useState } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-rust'
import { LANG_META } from '../utils/languages'

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path d="M8 3a1 1 0 000 2h8a1 1 0 011 1v10a1 1 0 01-1 1H8a1 1 0 01-1-1V6a1 1 0 011-1zM4 7a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-1h-2v1H4V9h1V7H4z"/>
    </svg>
  )
}
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
    </svg>
  )
}
function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
    </svg>
  )
}
function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zm-1 6a1 1 0 012 0v4a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v4a1 1 0 11-2 0V8z" clipRule="evenodd"/>
    </svg>
  )
}

export default function SnippetCard({ snippet, onEdit, onDelete, onTagClick }) {
  const codeRef = useRef(null)
  const [copied, setCopied] = useState(false)
  const meta = LANG_META[snippet.lang] || LANG_META.other

  useEffect(() => {
    if (codeRef.current) Prism.highlightElement(codeRef.current)
  }, [snippet.code, snippet.lang])

  function handleCopy() {
    navigator.clipboard.writeText(snippet.code).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const iBtn = (danger = false) => ({
    width: 30, height: 30, borderRadius: 7,
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'var(--surface2)', color: danger ? 'var(--red)' : 'var(--muted)',
    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'all 0.12s',
  })

  return (
    <div style={{
      background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 'var(--radius-lg)', overflow: 'hidden', transition: 'border-color 0.15s',
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '13px 16px' }}>
        <span style={{
          fontFamily: 'var(--mono)', fontSize: 10, fontWeight: 500,
          padding: '3px 8px', borderRadius: 6, flexShrink: 0,
          background: meta.bg, color: meta.color,
        }}>
          {meta.label}
        </span>

        <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)', flex: 1, letterSpacing: '-0.01em' }}>
          {snippet.title}
        </span>

        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginRight: 8 }}>
          {snippet.tags.map(tag => (
            <span key={tag}
              onClick={() => onTagClick(tag)}
              style={{
                fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 20,
                background: 'var(--surface2)', color: 'var(--muted)',
                border: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer',
              }}
              onMouseEnter={e => { e.target.style.color = 'var(--accent)'; e.target.style.borderColor = 'rgba(79,127,255,0.35)' }}
              onMouseLeave={e => { e.target.style.color = 'var(--muted)'; e.target.style.borderColor = 'rgba(255,255,255,0.08)' }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 5 }}>
          <button style={{ ...iBtn(), color: copied ? 'var(--green)' : 'var(--muted)' }} onClick={handleCopy} title="Copy code">
            {copied ? <CheckIcon /> : <CopyIcon />}
          </button>
          <button style={iBtn()} onClick={() => onEdit(snippet)} title="Edit">
            <EditIcon />
          </button>
          <button style={iBtn(true)} onClick={() => onDelete(snippet.id)} title="Delete">
            <TrashIcon />
          </button>
        </div>
      </div>

      {/* Code */}
      <pre style={{
        background: 'var(--bg)', margin: 0,
        borderTop: '1px solid rgba(255,255,255,0.08)',
        padding: '14px 16px', overflowX: 'auto', maxHeight: 320,
      }}>
        <code ref={codeRef} className={`language-${snippet.lang}`}>
          {snippet.code}
        </code>
      </pre>

      {/* Explanation */}
      {snippet.explain && (
        <div style={{
          padding: '10px 16px 13px', fontSize: 13, color: 'var(--muted)',
          lineHeight: 1.65, borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {snippet.explain}
        </div>
      )}
    </div>
  )
}
