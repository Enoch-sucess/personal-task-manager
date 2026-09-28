# Personal Task Manager — Week 1 (TechStudio Internship)

A task management app built for Week 1 of the TechStudio Internship online
stage — CRUD operations, form validation, and filtering, built with React,
TypeScript, and Tailwind CSS.

## Project Structure

- `client/` — the React frontend (this week's deliverable)
- `server/` — left untouched per the Week 1 brief

## Setup Instructions

1. Clone the repo:

```bash
   git clone https://github.com/Enoch-sucess/personal-task-manager.git
   cd personal-task-manager/client
```

2. Install dependencies:

```bash
   npm install
```

3. Run the dev server:

```bash
   npm run dev
```

4. Open the local URL Vite prints in the terminal (usually `http://localhost:5173`).

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

## Known Issues

None currently known.
