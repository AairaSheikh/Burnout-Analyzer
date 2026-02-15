# Burnout Analyzer

A web application for tracking burnout risk through daily wellness check-ins. Built with React, TypeScript, and Vite.

## Features

- **Daily Check-ins**: Log wellness metrics (sleep, stress, workload, mood)
- **Burnout Scoring**: Get a personalized burnout score (0-100) based on a deterministic formula
- **Trend Analysis**: Track your burnout risk over time with visual trends
- **Smart Recommendations**: Receive personalized action plans based on your metrics
- **Red-Flag Detection**: Get alerts when you show signs of severe burnout
- **Streak Tracking**: Maintain a daily check-in streak
- **Local Storage**: All data stored in your browser—no server required

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Testing

```bash
npm test -- --run
```

Tests cover:
- Burnout score calculation (determinism, range, formula)
- Trend classification (improving/stable/worsening)
- Red-flag detection (high scores, mood, spikes)
- Streak calculation (consecutive days)
- Recommendation selection (based on metrics)

## Routes

- `/` - Home page with feature overview
- `/checkins` - Dashboard with today's status and streak
- `/checkins/new` - Create or edit today's check-in
- `/checkins/history` - View last 30 check-ins
- `/checkins/weekly` - Weekly summary and recommendations
- `/checkins/settings` - Manage emergency contacts and export data
- `/how-it-works` - Learn about the burnout scoring system
- `/documentation` - Detailed feature documentation

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool with HMR
- **React Router** - Client-side routing
- **Vitest** - Unit testing
- **ESLint** - Code linting

## Data Storage

All data is stored in your browser's localStorage. No data is sent to any server.
