import React from 'react'

const s = {
  aside: {
    width: 220, flexShrink: 0, borderRight: '1px solid rgba(255,255,255,0.08)',
    padding: '20px 14px', display: 'flex', flexDirection: 'column',
    gap: 4, overflowY: 'auto', background: 'var(--bg)',
  },
  label: {
    fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
    letterSpacing: '0.1em', color: 'var(--muted)',
    padding: '0 8px', marginTop: 14, marginBottom: 4,
  },
  btn: (active) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    width: '100%', padding: '7px 10px', borderRadius: 8, border: 'none',
    background: active ? 'rgba(79,127,255,0.12)' : 'transparent',
    color: active ? 'var(--accent)' : 'var(--muted)',
    outline: active ? '1px solid rgba(79,127,255,0.35)' : 'none',
    fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 500,
    cursor: 'pointer', textAlign: 'left', transition: 'all 0.12s',
  }),
  count: {
    fontSize: 11, fontFamily: 'var(--mono)', background: 'var(--surface2)',
    borderRadius: 4, padding: '1px 6px', color: 'var(--muted)',
  },
}

export default function Sidebar({ snippets, activeTag, onTagChange }) {
  const tagMap = {}
  snippets.forEach(sn => sn.tags.forEach(t => { tagMap[t] = (tagMap[t] || 0) + 1 }))
  const tags = Object.entries(tagMap).sort((a, b) => b[1] - a[1])

  return (
    <aside style={s.aside}>
      <div style={{ ...s.label, marginTop: 0 }}>Library</div>
      <button style={s.btn(activeTag === 'all')} onClick={() => onTagChange('all')}>
        All snippets <span style={s.count}>{snippets.length}</span>
      </button>

      {tags.length > 0 && (
        <>
          <div style={s.label}>Tags</div>
          {tags.map(([tag, count]) => (
            <button key={tag} style={s.btn(activeTag === tag)} onClick={() => onTagChange(tag)}>
              {tag} <span style={s.count}>{count}</span>
            </button>
          ))}
        </>
      )}
    </aside>
  )
}
