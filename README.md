
# LEDGERA | Decentralized Supply Chain OS

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-production_prototype-green.svg)
![Stack](https://img.shields.io/badge/stack-Next.js_15-000000.svg)

**Trust is Good. Verification is Better.**

Ledgera is a deterministic state machine for global trade execution. It replaces opaque logistics with a transparent, cryptographically verifiable operating system. By synchronizing physical movement with digital settlement in real-time, it eliminates disputes and accelerates capital turnover.

## 🚀 Features

### Public Brand (`/`)
- **Cinematic Experience**: Scroll-linked storytelling with Framer Motion.
- **Light Theme**: Clean, professional aesthetic for public-facing trust.
- **Architecture Visualization**: Interactive SVG topology diagrams.

### Control Room (`/dashboard`)
- **Command Interface**: Dark-mode, high-contrast aesthetic designed for long-session monitoring.
- **Live Geo-Spatial Tracking**: Real-time asset visualization using MapLibre GL.
- **Agent Decision Feed**: distinct log of automated system actions (Escrow release, Risk flag, etc.).
- **Trust Scores**: Dynamic entity reputation visualization.

### Security Core
- **Zero Trust Architecture**: Every interaction is signed and verifiable.
- **Non-Custodial Escrow**: Smart contracts hold funds, released only upon cryptographic proof of delivery.
- **Identity (DID)**: Portable reputation attached to decentralized identifiers.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS v4.
- **Animation**: Framer Motion, CSS Native Scroll-Linked Effects.
- **Mapping**: MapLibre GL JS.
- **Backend (In-Progress)**: Supabase (PostgreSQL + Realtime), Prisma ORM.

## 📦 Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/ledgera.git
    cd ledgera
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Copy `.env.local.example` to `.env.local` and add your Supabase credentials.
    ```bash
    cp .env.local.example .env.local
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build for Production**
    ```bash
    npm run build
    npm start
    ```

## 🏗️ Architecture

The system follows a hybrid architecture:
1.  **Edge Gateway**: IoT sensors push telemetry via MQTT/WebSockets.
2.  **Supabase Realtime**: Normalizes data and broadcasts state changes.
3.  **Agent Engine**: Subscribes to streams and executes deterministic logic (e.g., "If Temp > 4C, Trigger Claim").
4.  **Blockchain Anchor**: Hashes critical events to a public ledger for auditability.

## 📜 License

MIT License. See [LICENSE](LICENSE) for details.

---

**Ledgera** — _Orchestrating the World's Trade._
