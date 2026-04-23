# T.E.S.T. - Train. Eat. Sleep. Thrive.

A personal fitness coaching and nutrition platform built with Next.js (Frontend) and Express/MongoDB (Backend).

## Tech Stack

- **Next.js** — Frontend framework (App Router)
- **Express.js** — Backend server
- **MongoDB** — Database (Mongoose ODM)
- **TypeScript** — Type-safe JavaScript
- **shadcn/ui** — Component library
- **Tailwind CSS** — Styling

## Getting Started

### Prerequisites

- Node.js (v18+) and npm
- MongoDB (Local or Atlas)

### Installation

```sh
# Install all dependencies (monorepo)
npm run install:all

# Start both client and server
npm run dev
```

The client will be at `http://localhost:3000` and the server at `http://localhost:5000`.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start both client and server concurrently |
| `npm run dev:client` | Start only the client |
| `npm run dev:server` | Start only the server |
| `npm run build:client` | Build client for production |
| `npm run build:server` | Build server for production |

## Project Structure

```
fitness/
├── client/           # Next.js application
├── server/           # Express server
└── package.json      # Monorepo root configuration
```
