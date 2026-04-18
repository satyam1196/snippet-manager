export const LANGUAGES = [
  'javascript', 'typescript', 'python', 'bash',
  'css', 'sql', 'go', 'rust', 'other',
]

export const LANG_META = {
  javascript: { label: 'JS',  prism: 'javascript', color: '#f5a623', bg: 'rgba(245,166,35,0.12)' },
  typescript: { label: 'TS',  prism: 'typescript', color: '#4f7fff', bg: 'rgba(79,127,255,0.12)' },
  python:     { label: 'PY',  prism: 'python',     color: '#3ecf8e', bg: 'rgba(62,207,142,0.12)' },
  bash:       { label: 'SH',  prism: 'bash',       color: '#9aa0b0', bg: 'rgba(154,160,176,0.12)' },
  css:        { label: 'CSS', prism: 'css',         color: '#a78bfa', bg: 'rgba(167,139,250,0.12)' },
  sql:        { label: 'SQL', prism: 'sql',         color: '#ff5a5f', bg: 'rgba(255,90,95,0.12)' },
  go:         { label: 'GO',  prism: 'go',          color: '#00c8dc', bg: 'rgba(0,200,220,0.12)' },
  rust:       { label: 'RS',  prism: 'rust',        color: '#e06030', bg: 'rgba(224,96,48,0.12)' },
  other:      { label: '???', prism: 'plain',       color: '#9aa0b0', bg: 'rgba(154,160,176,0.12)' },
}
