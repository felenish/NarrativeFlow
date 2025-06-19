---

## 1. Product Vision

Create **an “all-in-one writing workspace”** that lets authors draft, organize, and iterate on novels as comfortably as they might code in GitHub.

* **Organize**: Books → Chapters → Scenes, plus parallel spaces for **Characters** and **World-building**.
* **Experiment**: Branch any part of a book, rewrite it safely, then compare & merge.
* **Focus**: A clean, distraction-free editor with live preview, instant search, and optional dark mode.

---

## 2. Core User Stories

| ID  | As a(n)…     | I want to…                                           | So that…                                   |
| --- | ------------ | ---------------------------------------------------- | ------------------------------------------ |
| U-1 | Author       | create a new book project                            | I can start organizing content immediately |
| U-2 | Author       | add / rename / reorder chapters & scenes             | the structure reflects my story arc        |
| U-3 | Author       | maintain character bios, locations, and lore pages   | I have references while writing            |
| U-4 | Author       | create a feature branch of a chapter (or whole book) | I can explore alternate plot lines         |
| U-5 | Author       | view diffs between two versions                      | I understand every change                  |
| U-6 | Author       | merge a branch back into main or another branch      | I keep the best ideas                      |
| U-7 | Collaborator | leave inline comments                                | we can review each other’s work            |
| U-8 | Author       | export to Markdown / DOCX                            | I can share manuscripts with editors       |

---

## 3. Functional Requirements

### 3.1 Project & Content Management

* CRUD operations on **Books → Chapters → Scenes**
* Separate top-level collections for **Characters** and **World Notes** (free-form markdown)
* Drag-and-drop re-ordering in the sidebar

### 3.2 Git-like Version Control

* **Branch model**: each branch is a snapshot tree (Book, Chapters, Scenes, Character notes, World notes)
* **Commits**: auto-save every N seconds; manual “milestone” commits allowed
* **Diff viewer**: side-by-side text diff with syntax highlighting (Monaco diff API)
* **Merge UI**: three-way merge with conflict markers; accept left / right / both
* **History graph**: interactive DAG showing branches & merges (d3-flowchart)

### 3.3 Editor

* Split-pane **Markdown + live preview** (CodeMirror 6 + Marked)
* Emoji-style TODOs (`[ ]`, `[x]`) and comment blocks (`<!-- comment -->`)
* Word/character counter, reading-time estimate

### 3.4 Search & Navigation

* Global fuzzy search (Fuse.js) across all branches
* Outline panel generated from markdown headings
* Quick-open palette (Ctrl + P) to jump to any file

### 3.5 Collaboration (phase 2)

* Invite-only shared projects with per-branch permissions
* Inline comments stored as review threads tied to commit hashes

---

## 4. Non-Functional Requirements

| Category       | Target                                                   |
| -------------- | -------------------------------------------------------- |
| Performance    | Initial load < 2 s on broadband                          |
| Offline        | Core editing & branching works offline (PWA + IndexedDB) |
| Security       | JWT auth, HTTPS everywhere, encrypted at rest            |
| Scalability    | 10 k active authors, each with 5+ books                  |
| Accessibility  | WCAG 2.1 AA, full keyboard navigation                    |
| Responsiveness | Mobile editing possible; sidebar collapses               |

---

## 5. Architecture Overview

### 5.1 Front-end (React 18)

```
<BrowserRouter>
  <AppShell>
    <Sidebar />      // Books, Characters, World
    <MainPanel>
      <Editor />     // Markdown, diff, merge
      <Preview />    // Live render or diff view
    </MainPanel>
  </AppShell>
</BrowserRouter>
```

* **State**: Zustand store (lightweight, React-friendly)
* **Routing**: React Router 6 (nested routes for /book/\:id/chapter/\:id)
* **Styling**: Tailwind CSS + Radix UI primitives
* **Service Worker**: Workbox for offline, background sync

### 5.2 Back-end (Node 18 + Express / optional NestJS)

* **API**: REST (JSON)

  * `POST /books`, `PATCH /books/:id`
  * `POST /branches`, `POST /merge`, `GET /diff`
* **Auth**: Clerk / Auth0 for managed user accounts
* **Storage**: PostgreSQL (structure) + S3-compatible object store (snapshot blobs)
* **Version engine**: custom layer wrapping **isomorphic-git** for true Git packfiles **or** a CRDT library (Automerge) if real-time presence is needed later.

### 5.3 Data Model (simplified)

```mermaid
erDiagram
  users ||--o{ books : owns
  books ||--|{ chapters : contains
  books ||--|{ branches : has
  branches ||--|{ commits : contains
  commits ||--|{ snapshots : packs
  snapshots {
    id PK
    file_path
    blob_sha
  }
  commits {
    id PK
    branch_id FK
    message
    parent_commit_id
    created_at
  }
```

---

## 6. Component-Level Design (React)

| Component         | Responsibility                                    |
| ----------------- | ------------------------------------------------- |
| **AppShell**      | Layout frame, theme switcher                      |
| **Sidebar**       | Book list, branch selector, character/world tabs  |
| **BranchBadge**   | Shows current branch, dropdown to switch / create |
| **EditorPane**    | CodeMirror instance, tracked edits                |
| **PreviewPane**   | Live markdown render OR diff viewer               |
| **HistoryGraph**  | Visual commit graph (d3)                          |
| **MergeDialog**   | Three-way merge with conflict resolution          |
| **SearchModal**   | Global fuzzy search                               |
| **SettingsPanel** | Account, export, theme                            |

---

## 7. Key Workflows

1. **Create Book** → default `main` branch with empty Chapter 1.
2. Author writes, auto-commits every 60 s (debounced).
3. Click **Branch** → `experimental-ending`; diverges from latest commit.
4. After edits, open **Diff** vs `main`; review, then **Merge** (fast-forward or conflict dialog).
5. `main` gains new commit; history graph updates.

---

## 8. Technology Choices

| Concern                  | Library / Tool                             |
| ------------------------ | ------------------------------------------ |
| Rich text / code editing | CodeMirror 6, Monaco diff viewer           |
| State                    | Zustand (or Redux Toolkit if team prefers) |
| Version plumbing         | isomorphic-git & diff3                     |
| UI                       | React 18, Tailwind CSS, Radix UI           |
| Diagram                  | d3-force DAG or react-flow                 |
| Offline                  | Workbox, Dexie.js (IndexedDB wrapper)      |
| Testing                  | Vitest + React Testing Library             |
| CI/CD                    | GitHub Actions → Vercel / Netlify          |
| Lint/format              | ESLint, Prettier, Husky pre-commit         |

---

## 9. Security & Privacy

* All API routes behind JWT auth; refresh tokens rotated every 30 min.
* Role-based access on projects (`owner`, `writer`, `reviewer`).
* Snapshots encrypted with server-side AES-256.
* Rate-limit writes (burst + sustained) to prevent abuse.

---

## 10. Deployment Strategy

1. **Monorepo** (pnpm workspaces): `frontend/`, `backend/`, `shared/` types.
2. PR builds per branch on Vercel; preview URLs auto-commented in GitHub.
3. “Blue-green” production slots; database migrations via Prisma migrate.
4. Daily S3 snapshot & Postgres WAL backups.

---

## 11. Roadmap (MVP → v1)

| Sprint | Features                                               |
| ------ | ------------------------------------------------------ |
| 1      | Auth, create book, chapter CRUD, basic markdown editor |
| 2      | Branch/commit engine, auto-save, diff viewer           |
| 3      | Character & World tabs, drag-drop ordering             |
| 4      | Merge UI, history graph                                |
| 5      | Offline PWA, export (Markdown/DOCX)                    |
| 6      | Collaboration beta, inline comments                    |
| 7      | Polish, accessibility audit, launch                    |

---

## 12. Future Enhancements

* **AI writing assistant** (OpenAI) for outlines & consistency checks
* **Timeline mode** to visualize events chronologically
* **Scene cards / corkboard** for nonlinear planning
* **Plugins**: grammar check, EPUB export, Scrivener import
* **Webhook API** so third-party tools can trigger builds or CI pipelines

---

### End of Design Document

# Narrative Flow Implementation Plan

## 1. Project Setup
- Initialize monorepo with pnpm workspaces: `frontend/`, `backend/`, `shared/`.
- Set up GitHub repository, CI/CD (GitHub Actions, Vercel/Netlify).
- Configure Prettier, ESLint, Husky for code quality.

## 2. Backend Development
### 2.1 Core API & Auth
- Scaffold Node.js backend (Express or NestJS).
- Integrate user authentication (Clerk/Auth0) with JWT.
- Define REST API endpoints for books, chapters, scenes, branches, commits, diffs, merges.
- Set up PostgreSQL schema (users, books, chapters, branches, commits, snapshots).
- Integrate S3-compatible storage for snapshot blobs.

### 2.2 Version Control Engine
- Implement versioning logic using isomorphic-git (or Automerge for CRDT if real-time needed).
- Auto-save and manual commit endpoints.
- Diff and merge logic (diff3, Monaco diff API integration).

## 3. Frontend Development
### 3.1 App Shell & Routing
- Scaffold React 18 app with React Router 6.
- Implement AppShell, Sidebar, MainPanel layout.
- Set up Zustand for state management.

### 3.2 Editor & Preview
- Integrate CodeMirror 6 for markdown editing.
- Add live preview (Marked).
- Implement word/character count, reading time, emoji TODOs, and comment blocks.

### 3.3 Project & Content Management
- CRUD UI for books, chapters, scenes.
- Drag-and-drop reordering in sidebar.
- Separate tabs for Characters and World Notes.

### 3.4 Version Control UI
- Branch selector (BranchBadge), branch creation.
- Diff viewer (Monaco diff).
- Merge dialog (three-way merge, conflict resolution).
- History graph (d3-force DAG or react-flow).

### 3.5 Search & Navigation
- Global fuzzy search (Fuse.js).
- Outline panel from markdown headings.
- Quick-open palette (Ctrl+P).

### 3.6 Offline & PWA
- Add Workbox for offline support.
- Use Dexie.js for IndexedDB storage.

## 4. Collaboration (Phase 2)
- Implement invite-only shared projects.
- Per-branch permissions.
- Inline comments as review threads tied to commits.

## 5. Testing & Quality
- Write unit and integration tests (Vitest, React Testing Library).
- Accessibility audit (WCAG 2.1 AA).
- Responsive/mobile UI.

## 6. Security & Deployment
- Enforce HTTPS, JWT auth, encrypted storage.
- Role-based access control.
- Set up blue-green deployment, daily backups, and database migrations.

## 7. Roadmap & Sprints
- Sprint 1: Auth, book/chapter CRUD, basic editor.
- Sprint 2: Branch/commit engine, auto-save, diff viewer.
- Sprint 3: Character/World tabs, drag-drop ordering.
- Sprint 4: Merge UI, history graph.
- Sprint 5: Offline PWA, export (Markdown/DOCX).
- Sprint 6: Collaboration beta, inline comments.
- Sprint 7: Polish, accessibility, launch.

## 8. Future Enhancements
- AI writing assistant (OpenAI).
- Timeline mode, scene cards/corkboard.
- Plugin system (grammar, EPUB export, Scrivener import).
- Webhook API for integrations.
