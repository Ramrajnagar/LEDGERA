# Decentralized Supply Chain Orchestrator - Frontend

Modern React application for the Decentralized Supply Chain Orchestrator with real-time tracking, AI agent visualization, and blockchain integration.

## Features

- **Real-Time Dashboard** - KPIs, agent workflow visualization, and 3D animations
- **Order Management** - Create and track orders through AI agent workflow
- **Live Tracking** - WebSocket-based real-time order tracking with map visualization
- **Analytics** - Performance charts and blockchain explorer
- **Modern UI** - Glassmorphism design with dark theme and smooth animations

## Tech Stack

- React 19
- React Router
- Axios
- Three.js (3D visualization)
- MapLibre GL (maps)
- Recharts (analytics charts)
- Lucide React (icons)

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set the backend API URL (default: http://localhost:8000)

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   The app will run on http://localhost:5173

4. **Build for Production**
   ```bash
   npm run build
   npm run preview
   ```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── AgentFlow.jsx
│   ├── KPIBlock.jsx
│   ├── MapView.jsx
│   ├── Navbar.jsx
│   ├── ThreeTruck.jsx
│   └── TrustScore.jsx
├── context/          # Global state management
│   └── AppContext.jsx
├── hooks/            # Custom React hooks
│   └── useWebSocket.js
├── pages/            # Main application pages
│   ├── Dashboard.jsx
│   ├── OrderPage.jsx
│   ├── TrackingPage.jsx
│   └── AnalyticsPage.jsx
├── services/         # API integration
│   └── api.js
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── index.css         # Global styles & design system
```

## Backend Connection

Ensure the backend is running on http://localhost:8000 before using the frontend. See the backend README for setup instructions.
