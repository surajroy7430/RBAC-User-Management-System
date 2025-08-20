# RBAC Backend

This project is a minimal Node.js + Express backend demonstrating JWT authentication, role-based access control (admin, moderator, user), protected routes, and MongoDB Atlas connectivity.

## Setup

1. Copy files from this document into a project folder.
2. Run `npm install`.
3. Copy `.env.example` to `.env` and fill values (PORT, MONGO_URI, JWT_SECRET, SALT_ROUNDES).
4. Run `npm start` to start with server.

## Endpoints

- POST /api/auth/register -> register (body: name, email, password, role?)
- POST /api/auth/login -> login (body: email, password)
- GET /api/users -> admin only: list users
- PATCH /api/users/:id/role -> admin only: change role
- GET /api/profile -> authenticated user: view own profile
- PUT /api/profile -> authenticated user: update name/email
- CRUD /api/resources -> role-based routes

## Notes

- Uses express-validator for input validation
- JWT stored in Authorization header `Bearer <token>`
- MongoDB Atlas required (no local MongoDB)
