# Quizo App

Quizo is a quiz management application that allows teachers to create, update, view, and delete quizzes. This project includes a backend and a frontend, both set up with Docker for easy deployment.

## Project Structure

```
quizo/
  |-- backend/     # Backend (Node.js, Express, TypeScript)
  |-- frontend/    # Frontend (React, Vite, TypeScript)
  |-- docker-compose.yml
  |-- README.md
```

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (LTS recommended)
- [Docker](https://www.docker.com/) & Docker Compose
- [pnpm](https://pnpm.io/) or [npm](https://www.npmjs.com/)

---

# Setup Instructions

## Running with Docker Compose

The easiest way to run the application is using Docker Compose.

1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/quizo.git
   cd quizo
   ```
2. Build and start the containers:
   ```sh
   docker-compose up --build
   ```
3. The backend will be available at `http://localhost:5000`, and the frontend at `http://localhost:5173`.

To stop the containers, run:

```sh
docker-compose down
```

---

## Manual Setup (Without Docker)

If you prefer to run the application manually, follow these steps:

### Backend Setup

```sh
# ENV
DATABASE_URL=[DATABASE_URL]
FRONTEND_URL="http://localhost:4173"
MODE=prod #if in production
```

1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the database (if required) (this will create all table and also add some dummy data):
   ```sh
   npm run db:setup
   ```
4. Start the backend in development mode:
   ```sh
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

### Frontend Setup

```sh
  # ENV
  VITE_BACKEND_URL=http://localhost:3000
```

1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend in development mode:
   ```sh
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

---

## Available Scripts

### Backend Scripts

- `npm run dev` - Starts the backend in development mode
- `npm run start` - Starts the backend in production mode
- `npm run build` - Builds the backend
- `npm run db:setup` - Runs database setup

### Frontend Scripts

- `npm run dev` - Starts the frontend in development mode
- `npm run build` - Builds the frontend
- `npm run lint` - Runs lint checks
- `npm run preview` - Previews the production build

---

# Quizo App API Documentation

This document provides an overview of the API endpoints available in the Quizo App backend. The API allows teachers to create, update, view, and delete quizzes. Authentication is managed using cookies.

## Base URL

```
http://localhost:3000
```

## Authentication Routes

### 1. Get Current User

**Endpoint:** `GET /user`
**Description:** Returns the currently authenticated user.
**Response:**

- **200 OK**: `{ id: number, username: string }`
- **401 Unauthorized**: If the user is not logged in.

---

### 2. User Login

**Endpoint:** `POST /login`
**Description:** Authenticates a user.
**Request Body:**

```json
{
  "username": "exampleUser",
  "password": "password123"
}
```

**Responses:**

- **200 OK**: "ok"
- **400 Bad Request**: "INVALID" (if username or password is missing)
- **404 Not Found**: "Invalid Credentials"

---

### 3. User Signup

**Endpoint:** `POST /signup`
**Description:** Registers a new user.
**Request Body:**

```json
{
  "username": "newUser",
  "password": "securePassword"
}
```

**Responses:**

- **200 OK**: "ok"
- **400 Bad Request**: "INVALID" (if username or password is missing)
- **400 Bad Request**: "Username Already Taken. Choose another username."

---

### 4. User Logout

**Endpoint:** `GET /logout`
**Description:** Logs out the user by clearing the authentication cookie.
**Response:**

- **200 OK**: "ok"

## Quiz Routes

### 5. Get All Quizzes

**Endpoint:** `GET /quizzes`
**Description:** Fetches all quizzes created by the logged-in teacher.
**Responses:**

- **200 OK**: `[ { id: number, title: string, description: string, teacher_id: number }, ... ]`
- **401 Unauthorized**: If the user is not logged in.

---

### 6. Get Single Quiz

**Endpoint:** `GET /quizzes/:id`
**Description:** Fetches a single quiz by ID.
**Responses:**

- **200 OK**: `{ id: number, title: string, description: string, teacher_id: number }`
- **401 Unauthorized**: If the user is not logged in.
- **404 Not Found**: If the quiz does not exist.

---

### 7. Create a Quiz

**Endpoint:** `POST /quizzes`
**Description:** Creates a new quiz.
**Request Body:**

```json
{
  "title": "Quiz Title",
  "description": "Quiz Description"
}
```

**Responses:**

- **200 OK**: "ok"
- **400 Bad Request**: "INVALID" (if title or description is missing)
- **500 Internal Server Error**: "INTERNAL SERVER ERROR. Try Again Later"

---

### 8. Update a Quiz

**Endpoint:** `PUT /quizzes/:id`
**Description:** Updates an existing quiz.
**Request Body:**

```json
{
  "title": "Updated Title",
  "description": "Updated Description"
}
```

**Responses:**

- **200 OK**: "ok"
- **400 Bad Request**: "INVALID" (if title or description is missing)
- **401 Unauthorized**: If the user is not logged in.
- **404 Not Found**: If the quiz does not exist.

---

### 9. Delete a Quiz

**Endpoint:** `DELETE /quizzes/:id`
**Description:** Deletes an existing quiz.
**Responses:**

- **200 OK**: "ok"
- **401 Unauthorized**: If the user is not logged in.
- **404 Not Found**: If the quiz does not exist.

---
