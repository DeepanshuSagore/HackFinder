# HackFinder (React + Vite)

HackFinder is now a modern React application powered by Vite. A dedicated landing page greets new builders, while the core UI lets hackers browse and filter posts, manage interests from the dashboard, preview post details, and create new opportunities—all using client-side state that mirrors the original static prototype. Visual polish comes from a shared design system, global CSS tokens, and Phosphor icons.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs on [http://localhost:5173](http://localhost:5173) by default. Hot module replacement is enabled out of the box.

## Available Scripts

- `npm run dev` – start the Vite development server.
- `npm run build` – build the app for production (artifacts land in `dist/`).
- `npm run preview` – preview the production build locally.

## Project Structure

```
.
├── index.html           # Vite entry point
├── package.json
├── style.css            # Global design system styles reused by the React app
├── src
│   ├── App.jsx          # Top-level application shell and state management
│   ├── main.jsx         # React entry point
│   ├── index.css        # Imports the shared global stylesheet
│   ├── components       # Reusable UI building blocks
│   └── data
│       └── appData.js   # Mock data backing the UI
└── vite.config.js
```

## Next Steps

- Wire the UI to an API once the Express/MongoDB backend is ready.
- Replace the in-memory mock data with real fetch calls and persistence.
- Add tests (e.g., with Vitest + React Testing Library) as the data layer grows.

## Notes

`npm install` currently reports a couple of moderate-severity advisories from transitive dependencies. They originate upstream in the Vite/React toolchain; monitor `npm audit` for patches before applying forced upgrades.
