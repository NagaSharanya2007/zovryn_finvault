# Finance Dashboard

A React-based personal finance dashboard built with Vite and Recharts. This project includes transaction management, charts, a light/dark theme toggle, permissions for Admin/Viewer roles, and localStorage persistence.

## Project structure

- `index.html` - App shell entry point
- `package.json` - npm scripts and dependencies
- `vite.config.js` - Vite build configuration
- `src/main.jsx` - React entry file
- `src/App.jsx` - Main application component, UI, state, and styles

## Features

- Responsive finance dashboard UI
- `Balance Trend` line chart with light/dark theme support
- `Spending Breakdown` donut chart with category legend
- Transactions list with search, filter, sort, and delete actions
- Add transaction modal for Admin users
- Admin/Viewer role toggle
- Light/Dark theme toggle
- LocalStorage persistence for transactions, role, and theme

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the development server

```bash
npm run dev
```

3. Open the app

Visit `http://localhost:5173/` in your browser.

## Production build

```bash
npm run build
```

To preview the built app locally:

```bash
npm run preview
```

## What was implemented

- The dashboard is built as a single-page React app using `src/App.jsx`.
- `AppProvider` manages centralized state and persists data with `localStorage`.
- `TransactionsPanel` includes a search box, filter pills, and sort buttons.
- The `Add` button is now displayed beside the transaction search area only for Admin users.
- The header only contains role selection and theme toggle.
- The `BalanceTrendChart` uses theme-aware colors so the line and axes remain visible in light mode.
- The `Spending Breakdown` chart legend uses styled rows with color markers and values.
- Light mode styling has been improved for card contrast and form/combo controls.

## Notes

- Viewer role hides the add button and prevents adding new transactions.
- Admin role displays the add button in the transaction section only.
- The app uses Vite for fast development and production building.
