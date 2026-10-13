# Personal Task Manager — Week 1 (TechStudio Internship)

A task management app built for Week 1 of the TechStudio Internship online
stage — CRUD operations, form validation, and filtering, built with React,
TypeScript, and Tailwind CSS.

## Project Structure

- `client/` — the React frontend (this week's deliverable)
- `server/` — left untouched per the Week 1 brief

## Setup Instructions

You need **two terminals**, one for the server and one for the client.

**Server**

1. `cd server`
2. `npm install`
3. Create `server/.env`:

```
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=a-long-random-string
   PORT=5000
```

4. `npm run dev`

**Client**

1. `cd client`
2. `npm install`
3. (Optional) create `client/.env` with `VITE_API_URL=http://localhost:5000`.
   If omitted, the client defaults to `http://localhost:5000`.
4. `npm run dev` and open `http://localhost:5173`

## Features

- Create, edit, and delete tasks — each with a title, description, due date,
  category (Work / Personal / Urgent), and a completion flag
- Form validation: all fields required, due date cannot be in the past
- Filter tasks by category and by completion status
- Delete confirmation modal to prevent accidental deletion
- Fully responsive layout, including a collapsible mobile navigation menu
- A landing/cover page introducing the app, separate from the main task list

## Data Persistence

Since there is no backend (the `server/` folder is intentionally untouched
per the brief), all task data is managed with React state (`useState`,
`useEffect`) and persisted to the browser's `localStorage`, so tasks survive
a page refresh.

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS
- React Router (client-side routing between My Tasks / New Task / Edit Task
  / Landing pages)

  ## Week 3: Search Feature (branch: `feature/search`)

A search box on the My Tasks page that finds tasks by **title or description**.
The search runs on the backend: the client calls
`GET /api/task?search=<term>` with the logged-in user's token, and the
server returns only that user's matching tasks (case-insensitive).

### How it works

- **Backend (`server/`)**: `getTasks` accepts an optional `search` query
  parameter. When present, it adds a case-insensitive `$regex` match on
  `title` or `description`, combined with the existing `user` filter, so
  one user can never see another user's tasks through search.
- **Frontend (`client/`)**:
  - A login page (`/login`) calls `POST /api/auth/login` and stores the
    returned token in `localStorage`.
  - A `useSearch` hook debounces typing (300ms), cancels outdated
    requests, and calls the search endpoint with the token.
  - Search results use the same task card as the main list, in read-only
    mode.
- CORS is enabled on the server for the client's origin.

**Using search**

1. Register an account via `POST /api/auth/register` (Postman) or use an
   existing one.
2. Create a few tasks with `POST /api/task` (see `server/README.md`).
3. Log in on the client at `/login`, then use the search box on My Tasks.

## Known Issues

- Search results come from the server database, while tasks created in the
  UI are still stored in the browser's `localStorage` (Week 1). The two
  are not synced, so UI-created tasks do not appear in search results.
  Search results are shown read-only for this reason.
- The server's CORS setting allows only `http://localhost:5173`. If the
  client starts on a different port, update the allowed origin in
  `server/src/app.ts`.
- The navbar shows a Login link even when already logged in; there is no
  logout button in the UI yet.
