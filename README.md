# TripMate – Luxury Travel Planning & Intelligent Exploration

> **"Plan together. Travel anywhere, even offline."**

A premium, modern travel-technology platform engineered with the editorial aesthetic of luxury travel publications and the design refinement of leading consumer platforms (Airbnb, Booking.com, Apple). Built for the **Semester III Software Prototyping** assignment as a high-fidelity commercial prototype.

---

## 🚀 Live Demo & Local Access

- **Local Web Application:** **[http://localhost:5173](http://localhost:5173)**
- **Network Access:** `http://192.168.0.106:5173`
- **One-Click Windows Launcher:** Double-click `start.bat` in the project root.

---

## 🎨 Visual Identity & Design System

TripMate features a distinct, elevated design language combining rich dark contrast sections, organic cream tones, and an elevated teal identity:

- **Primary Deep Teal**: `#087F78` — Brand anchor, primary CTAs, active indicators
- **Dark Teal**: `#064E49` — Hero backdrops, editorial contrast sections
- **Mint Accent**: `#B9F3E8` — Pill highlights, glowing accents, badges
- **Soft Cream**: `#FAF9F6` — Card headers, secondary surfaces
- **Canvas Background**: `#F5F7F6` — Clean, breathable background
- **Dark Typography**: `#172321` — High-contrast text
- **Muted Typography**: `#687773` — Secondary labels and metadata
- **Typography Stack**:
  - **Headings & Display**: `Plus Jakarta Sans` (weights 600, 700, 800)
  - **Interface & Body**: `Manrope` (weights 400, 500, 600, 700)

---

## 🌟 Redesigned Core Modules

### 1. 🧭 Floating Pill Navigation
- **Floating pill design**: Glassmorphic blur (`backdrop-blur-xl`), soft floating shadow, pill borders.
- **Animated Navigation Indicator**: Sliding active indicator powered by Framer Motion.
- **Status & Control Pill**: Offline readiness indicator with live state toggle, notification bell with unread badge, and luxury profile menu.
- **Mobile Experience**: Fixed floating bottom bar for ergonomic one-thumb interaction.

### 2. 🌍 Explore Destinations (`/explore`)
- **Cinematic Hero**:
  - *"Your next adventure starts here."*
  - Floating assurance badges: *"Your journey, intelligently planned."* & *"Explore destinations around the world."*
- **Floating Search Experience**:
  - Keyword search, start/end dates, dynamic budget slider up to ₹25,000, and interest chips.
- **Experience Categories**:
  - Beach Escapes, Mountain Retreats, Cultural Journeys, Adventure Trails, Culinary Trails with photo cards that filter destinations on click.
- **Featured Spotlight (Goa)**:
  - Editorial side-by-side showcase with climate info, 4-day budget, and 1-click booking preview.
- **Photographic Destination Cards**:
  - Full-bleed photography, rounded luxury corners (`rounded-3xl`), animated wishlist heart button, duration badges, and hover elevation.

### 3. 👥 Group Planning Lounge (`/group`)
- **Split Collaboration Layout**:
  - **Left**: Active expedition details, member avatar stack (Sam, Priya, Rohan, You), shareable invite copy button, and live group chat with attachment & send controls.
  - **Right**: Consensus voting cards with animated progress bars, majority winner showcase banner, tie detection, and 1-vote-per-member rule.

### 4. 📅 Daily Trip Schedule (`/schedule`)
- **Editorial Trip Cover Banner**: Photography cover with Candolim location, 4 travelers badge, and live offline status.
- **Luxury Vertical Timeline**:
  - Time badges, route distances, travel durations, and confirmed e-pass vouchers.
  - **Updated Activity Badge**: When Fort Aguada is replaced by an indoor backup plan, the stop is highlighted with an animated amber contingency badge.
- **Offline Download**: 1-click serialization to `LocalStorage` with confetti celebration.

### 5. 💰 Budget Ledger (`/budget`)
- **Financial Metric Cards**: Large figures for Total Budget (₹30,000), Spent, Remaining Balance, and % Utilized.
- **Recharts Donut Chart**: Category allocation donut with custom dark tooltips and metric percentage pills.
- **Threshold Alerts**:
  - ⚠️ **70%+ Warning Alert**: Amber alert box triggers when spending crosses ₹21,000.
  - 🚨 **Over-Budget Critical Danger Alert**: Red banner triggers when spending crosses ₹30,000.
- **Multi-Currency Engine**: Instant conversion for USD ($1 = ₹84) and EUR (€1 = ₹91).

### 6. 🚨 Alerts & Contingency Engine (`/alerts`)
- **Atmospheric Disruption Alert**: Stormy weather alert for Fort Aguada rain disruption with Candolim GPS context.
- **3 Sheltered Alternatives**:
  1. **Museum of Goa** (Indoor · 1.2 km · Open till 6 PM)
  2. **Spice farm tour** (Covered · 3.5 km · Open till 5 PM)
  3. **Cafe and craft market** (Indoor · 0.8 km · Open till 9 PM)
- **Actions**:
  - **"Pick Plan"**: Seamlessly updates Day 2 09:00 stop in Schedule.
  - **"Add to Vote"**: Automatically pushes option to Group Planning voting list.
  - **"Reset to Fort Aguada"**: Restores original itinerary.

### 7. 🎫 Profile & Travel Documents (`/profile`)
- Frequent traveler profile with status indicators.
- Saved boarding passes and hotel vouchers with confirmation codes.
- LocalStorage state management controls.

---

## 🛠️ Technology Stack
- **React 18**
- **Vite 5**
- **Tailwind CSS 3**
- **Framer Motion**
- **Lucide React**
- **Recharts**
- **Canvas Confetti**
- **LocalStorage API** (zero-backend persistence)
