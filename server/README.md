# Personal Task Manager — Backend (Week 2)

A REST API for the Personal Task Manager, built for Week 2 of the
TechStudio Internship online stage — authentication, authorization, and
user-scoped task CRUD, built with Node.js, Express, MongoDB (Mongoose),
and JWT.

## Setup Instructions

1. From the `server/` folder, install dependencies:

```bash
   npm install
```

2. Create a `.env` file in `server/` with the following variables:
   MONGO_URI=your-mongodb-connection-string
   JWT_SECRET=a-long-random-string
   PORT=5000

3. Run the dev server:

```bash
   npm run dev
```

4. Confirm the terminal shows "Database Connected Successfully" and
   "server is running on port 5000" with no errors.

## Testing

This week's deliverable has no client integration — everything is tested
directly via Postman (or any API client). No frontend calls this API.

### Auth routes (`/api/auth`)

- `POST /api/auth/register` — body: `{ username, email, password }`
- `POST /api/auth/login` — body: `{ identifier, password }` (identifier
  can be either username or email)

Both return `{ _id, username, email, token }` on success. Use the
returned `token` as a Bearer token for all task routes below.

### Task routes (`/api/task`) — all require `Authorization: Bearer <token>`

- `POST /api/task` — create a task. Body: `{ title, description, dueDate, category }`
- `GET /api/task` — get all tasks belonging to the logged-in user
- `GET /api/task/:id` — get a single task by id (must belong to the logged-in user)
- `PUT /api/task/:id` — update a task (must belong to the logged-in user)
- `DELETE /api/task/:id` — delete a task (must belong to the logged-in user)

Tasks are scoped per user: a request for a task id that exists but
belongs to a different user returns `404`, identical to a task that
doesn't exist at all — this is intentional, so one user can't tell
whether another user's task id is valid.

## Authentication Notes

- Passwords are hashed with bcrypt before being stored (via a Mongoose
  pre-save hook) — never stored in plain text.
- Login accepts either `username` or `email` as the `identifier`.
- A wrong password and a nonexistent identifier both return the same
  `401 "Invalid Credentials"` message, to avoid revealing which accounts
  exist.
- Logout is handled client-side by discarding the token — JWTs are
  stateless, so there is no server-side session to end.

## Tech Stack

- Node.js + Express + TypeScript
- MongoDB with Mongoose
- JWT (jsonwebtoken) for authentication
- bcrypt for password hashing

## Known Issues

None currently known.
