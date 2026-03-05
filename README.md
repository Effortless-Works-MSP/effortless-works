# Effortless Works

A Next.js 14 + TypeScript + Tailwind CSS website, on Vercel.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS custom properties
- **Deployment**: Vercel

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout + metadata
│   └── page.tsx          # Home page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Marquee.tsx
│   │   ├── About.tsx
│   │   ├── Products.tsx
│   │   ├── Areas.tsx
│   │   ├── Quote.tsx
│   │   └── CTA.tsx
│   └── ui/
│       └── Logo.tsx
├── lib/
│   ├── data.ts           # All site content/data
│   └── useReveal.ts      # Scroll animation hook
├── styles/
│   └── globals.css
└── types/
    └── index.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Vercel auto-detects Next.js — no config needed.

### Option B — GitHub + Vercel Dashboard

1. Push this project to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your repo
4. Click **Deploy** — done ✓

---

## Customization

All site content lives in `src/lib/data.ts`:
- `PRODUCTS` — update names, prices, descriptions
- `LIFE_AREAS` — the 4 life area cards
- `PILLARS` — the pill tags in the About section
- `MARQUEE_ITEMS` — the scrolling strip text
- `NAV_LINKS` — navigation links

Color palette lives in `src/styles/globals.css` as CSS variables.
