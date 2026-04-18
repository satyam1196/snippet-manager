import React, { useRef } from 'react'
import { exportSnippets, importSnippets } from '../utils/exportImport'

export default function Header({ snippets, search, onSearch, onAdd, onImport }) {
  const fileRef = useRef(null)

  const langCount = {}
  snippets.forEach(s => { langCount[s.lang] = (langCount[s.lang] || 0) + 1 })
  const topLang = Object.entries(langCount).sort((a, b) => b[1] - a[1])[0]

  async function handleImport(e) {
    const file = e.target.files[0]
    if (!file) return
    try {
      const data = await importSnippets(file)
      onImport(data)
    } catch (err) {
      alert('Could not import: ' + err.message)
    }
    e.target.value = ''
  }

  const ghostBtn = {
    height: 32, padding: '0 12px', background: 'transparent',
    border: '1px solid rgba(255,255,255,0.12)', borderRadius: 8,
    color: 'var(--muted)', fontFamily: 'var(--sans)', fontSize: 12,
    fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
    whiteSpace: 'nowrap',
  }

  return (
    <header style={{
      borderBottom: '1px solid rgba(255,255,255,0.08)', padding: '0 28px',
      height: 56, display: 'flex', alignItems: 'center', gap: 16,
      position: 'sticky', top: 0, background: 'var(--bg)', zIndex: 10,
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 9, fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', marginRight: 8, flexShrink: 0 }}>
        <div style={{ width: 28, height: 28, background: 'var(--accent)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="white">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2zm0 6a1 1 0 011-1h6a1 1 0 010 2H4a1 1 0 01-1-1z"/>
          </svg>
        </div>
        SnipVault
      </div>

      {/* Search */}
      <div style={{ flex: 1, position: 'relative', maxWidth: 380 }}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor"
          style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }}>
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
        </svg>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search snippets, tags, code..."
          style={{
            width: '100%', height: 36, padding: '0 14px 0 34px',
            background: 'var(--surface)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 9, color: 'var(--text)', fontFamily: 'var(--sans)', fontSize: 13,
            outline: 'none',
          }}
        />
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 16, marginLeft: 4 }}>
        {[
          { val: snippets.length, label: 'snippets' },
          { val: [...new Set(snippets.flatMap(s => s.tags))].length, label: 'tags' },
          topLang && { val: topLang[0], label: 'top lang' },
        ].filter(Boolean).map((stat, i) => (
          <div key={i} style={{ fontSize: 12, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
            <strong style={{ color: 'var(--text)', fontWeight: 500, marginRight: 3 }}>{stat.val}</strong>
            {stat.label}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6, marginLeft: 'auto' }}>
        <button style={ghostBtn} onClick={() => exportSnippets(snippets)} title="Export all snippets as JSON">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
          </svg>
          Export
        </button>
        <button style={ghostBtn} onClick={() => fileRef.current.click()} title="Import snippets from JSON">
          <svg width="13" height="13" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
          Import
        </button>
        <input ref={fileRef} type="file" accept=".json" style={{ display: 'none' }} onChange={handleImport} />
        <button
          onClick={onAdd}
          style={{
            height: 32, padding: '0 14px', background: 'var(--accent)', color: '#fff',
            border: 'none', borderRadius: 8, fontFamily: 'var(--sans)', fontSize: 13,
            fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
          </svg>
          Add snippet
        </button>
      </div>
    </header>
  )
}
