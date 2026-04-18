import React, { useState, useMemo, useCallback } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SnippetCard from './components/SnippetCard'
import SnippetModal from './components/SnippetModal'
import Toast from './components/Toast'
import { useSnippets } from './hooks/useSnippets'

export default function App() {
  const { snippets, addSnippet, updateSnippet, deleteSnippet, importSnippets } = useSnippets()
  const [search, setSearch] = useState('')
  const [activeTag, setActiveTag] = useState('all')
  const [modal, setModal] = useState(null) // null | 'new' | snippet object
  const [toast, setToast] = useState({ show: false, message: '' })

  function showToast(message) {
    setToast({ show: true, message })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2200)
  }

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return snippets.filter(s => {
      const matchTag = activeTag === 'all' || s.tags.includes(activeTag)
      const matchQ = !q
        || s.title.toLowerCase().includes(q)
        || s.tags.some(t => t.includes(q))
        || s.code.toLowerCase().includes(q)
        || (s.explain || '').toLowerCase().includes(q)
      return matchTag && matchQ
    })
  }, [snippets, search, activeTag])

  const handleSave = useCallback((data) => {
    if (data.id) {
      updateSnippet(data.id, data)
      showToast('Snippet updated!')
    } else {
      addSnippet(data)
      showToast('Snippet saved!')
    }
  }, [addSnippet, updateSnippet])

  const handleDelete = useCallback((id) => {
    if (window.confirm('Delete this snippet?')) {
      deleteSnippet(id)
      showToast('Snippet deleted.')
    }
  }, [deleteSnippet])

  const handleImport = useCallback((data) => {
    importSnippets(data)
    showToast(`Imported ${data.length} snippets!`)
  }, [importSnippets])

  const handleTagClick = useCallback((tag) => {
    setActiveTag(tag)
  }, [])

  return (
    <>
      <Header
        snippets={snippets}
        search={search}
        onSearch={setSearch}
        onAdd={() => setModal('new')}
        onImport={handleImport}
      />

      <div style={{ display: 'flex', height: 'calc(100vh - 56px)' }}>
        <Sidebar
          snippets={snippets}
          activeTag={activeTag}
          onTagChange={setActiveTag}
        />

        <main style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--muted)', fontSize: 14 }}>
              {snippets.length === 0
                ? 'No snippets yet. Add your first one!'
                : 'No snippets match your search.'}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {filtered.map(s => (
                <SnippetCard
                  key={s.id}
                  snippet={s}
                  onEdit={sn => setModal(sn)}
                  onDelete={handleDelete}
                  onTagClick={handleTagClick}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {modal && (
        <SnippetModal
          snippet={modal === 'new' ? null : modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      <Toast show={toast.show} message={toast.message} />
    </>
  )
}
