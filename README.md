# Presión — AI-Powered Blood Pressure Tracker (Demo)

A bilingual (English/Spanish) portfolio/pitch prototype for an AI-powered blood
pressure companion app, built for older, Spanish-speaking adults who struggle
with manual BP tracking. This is a **frontend-only demo** — everything runs
locally with mock data. There is no backend, no real AI API, and no device
integration.

## The concept

Manual blood pressure logging fails older adults in predictable ways: missed
readings, transcription errors, lost paper records, and no visibility into
trends — leaving their doctor with an incomplete picture. The proposed
product pairs a WiFi/Bluetooth blood pressure monitor with an AI layer that
turns raw readings into simple, conversational insights in the user's
language of choice.

This build demonstrates that experience end-to-end with realistic mock data.

## Features

- **Landing page** — problem/solution narrative with a three-step visual.
- **Blank profile form** — age, sex, height/weight, medications, and BP goal;
  nothing is pre-filled, so the demo personalizes itself to whoever fills it in.
- **~60 days of simulated BP data** — realistic day-to-day variation, not
  static/identical numbers.
- **Two-sided dashboard** — summary cards, a systolic/diastolic trend chart,
  a pulse chart, a reading-distribution donut, a recent-readings table (with
  a "view all" modal), and a plain-language insight card, all computed live
  from the mock dataset.
- **Scripted AI chat** — keyword-matched (not a real LLM call) but computes
  real answers from the mock data, with a typing-indicator delay for realism.
- **Full English/Spanish toggle** — flips every string in the app, including
  chart labels, table headers, and previously-sent chat messages.
- **Light/dark mode** — a full dark palette for low-vision users, toggle in
  the navbar, persisted to `localStorage`, and respects the OS preference on
  first visit.
- **Accessible, senior-friendly UI** — large type, high contrast, large tap
  targets, semantic HTML/ARIA, visible focus states, responsive down to
  mobile.

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Recharts · lucide-react

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To produce a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
├── components/     UI components (Navbar, Hero, ProfileForm, Dashboard,
│                   charts, AIChat, ThemeToggle, LanguageToggle, ...)
├── data/           Mock blood-pressure reading generator
├── hooks/          useTheme (light/dark mode state + persistence)
├── i18n/           Centralized English/Spanish translation strings
├── types/          Shared TypeScript types
├── utils/          BP calculations (averages, trends, distribution) and the
│                   scripted chat response engine
├── App.tsx         View routing (landing → profile → dashboard) + app state
└── main.tsx        Entry point
```

## Out of scope (by design)

No authentication, no backend/database, no real AI API, and no real device
integration — this is a frontend prototype meant to demonstrate the product
concept and UX, not a production system.
