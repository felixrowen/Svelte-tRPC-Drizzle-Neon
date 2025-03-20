# Svelte-tRPC-Drizzle-Neon Todo App

A simple Todo application built with:

- [SvelteKit](https://kit.svelte.dev/) - A framework for building web applications
- [tRPC](https://trpc.io/) - End-to-end typesafe APIs
- [Drizzle ORM](https://orm.drizzle.team/) - TypeScript ORM
- [Neon Postgres](https://neon.tech/) - Serverless Postgres database

## Getting Started

1. Clone this repository:

   ```
   git clone <repository-url>
   cd Svelte-tRPC-Drizzle-Neon
   ```

2. Install dependencies:

   ```
   pnpm install
   ```

3. Set up your Neon Postgres database:

   - Create a free account at [neon.tech](https://neon.tech)
   - Create a new project and database
   - Copy your connection string

4. Update the `.env` file with your database connection string:

   ```
   DATABASE_URL="postgres://user:password@your-neon-host/dbname"
   ```

5. Push the database schema:

   ```
   pnpm db:push
   ```

6. Start the development server:

   ```
   pnpm dev
   ```

7. Open your browser and navigate to `http://localhost:5173`

## Features

- Create, read, and update todos
- Toggle todo completion status
- User management
- End-to-end type safety with tRPC
- PostgreSQL database with Drizzle ORM
- Modern UI with Tailwind CSS

## Project Structure

- `/src/lib/server/db` - Database schema and configuration
- `/src/lib/server/trpc` - tRPC router and context
- `/src/lib/components` - Reusable UI components
- `/src/routes` - SvelteKit routes
