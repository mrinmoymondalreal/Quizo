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
3. Set up the database (if required):
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

## Contributing

Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.
