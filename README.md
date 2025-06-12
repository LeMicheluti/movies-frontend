# Movies Frontend

This is the frontend application for the Movies API, built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

### 1. Install dependencies

```
npm install
```

### 2. Run the development server

```
npm run dev
```

### 3. API Connection

The frontend expects the backend API to be running at:

```
http://localhost:3001
```

You can configure the base URL in the environment variable `api.ts`:

```
baseURL=http://localhost:3001
```

## Features

- List movies, actors and ratings.
- Responsive UI using Tailwind CSS.
- Interacts with a RESTful API backend.
