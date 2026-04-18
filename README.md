# SnipVault — AI-Powered Code Snippet Manager

A fast, AI-powered snippet manager built with **React + Vite**. Save, search, and organise your code snippets with automatic AI tagging, naming, and explanation via the Claude API.

🔗 **Live:** [satyam1196.github.io/snippet-manager](https://satyam1196.github.io/snippet-manager)

---

## Features

- **AI auto-fill** — paste any code, Claude names it, tags it, and explains it instantly
- **Syntax highlighting** — powered by Prism.js across 8 languages
- **Tag-based filtering** — sidebar auto-generates from your snippet tags
- **Full-text search** — searches titles, tags, code, and explanations
- **Export / Import** — back up and restore snippets as JSON
- **Persistent storage** — all data saved to localStorage
- **Auto-deploy** — GitHub Actions CI/CD pipeline on every push to `main`

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + Vite |
| Syntax highlighting | Prism.js |
| AI | Anthropic Claude API (`claude-sonnet-4`) |
| Deployment | GitHub Pages via GitHub Actions |
| Storage | localStorage (upgrade 2 adds Supabase) |

## Local Development

```bash
git clone https://github.com/satyam1196/snippet-manager.git
cd snippet-manager
npm install
npm run dev
```

Open [http://localhost:5173/snippet-manager/](http://localhost:5173/snippet-manager/)

## Build & Deploy

```bash
npm run build   # outputs to /dist
```

Pushing to `main` auto-deploys via the GitHub Actions workflow in `.github/workflows/deploy.yml`.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx        # Search, stats, export/import
│   ├── Sidebar.jsx       # Tag-based navigation
│   ├── SnippetCard.jsx   # Card with syntax highlighting
│   ├── SnippetModal.jsx  # Add/edit modal with AI
│   └── Toast.jsx         # Notification component
├── hooks/
│   └── useSnippets.js    # All state + localStorage logic
├── utils/
│   ├── ai.js             # Claude API integration
│   ├── exportImport.js   # JSON export/import
│   └── languages.js      # Language metadata
├── App.jsx
├── main.jsx
└── index.css
```

## Roadmap

- [ ] **Upgrade 2** — Node.js + Supabase backend with user auth
- [ ] **Upgrade 3** — Semantic search with pgvector embeddings
- [ ] **Upgrade 3** — VS Code extension
