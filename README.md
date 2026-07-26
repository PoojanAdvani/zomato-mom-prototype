# Zomato Mom — Interactive Product Prototype

> Daily, high-quality home-cooked meals for working professionals — powered by home chefs and
> **Blinkit-verified ingredients**. A fully interactive prototype built to feature a product
> case study in a **Product Management portfolio**.

**This is a concept prototype, not a real product and not affiliated with Zomato.** No real
payments are processed; all data is mocked.

---

## Why this exists

Most portfolio prototypes stop at the consumer ordering screen. This one demonstrates
**end-to-end product thinking** across three connected lenses, so a recruiter can *experience*
the value proposition, both sides of the marketplace, and the business mechanics behind it.

| Lens | What it shows |
| --- | --- |
| 🍽️ **Consumer app** | Discovery → verified Mom Chef → meal customization → subscription checkout → live "Served Hot" tracking |
| 👩‍🍳 **Chef app** | Daily earnings, order intake, and Blinkit ingredient ordering that keeps the "Verified Ingredients" tag alive |
| 📈 **Strategy console** | Interactive simulators: the **>25% Blinkit audit trigger**, unit economics, revenue model, market sizing, positioning, and the North Star KPI funnel |

### Standout, portfolio-specific touches
- **PM annotation layer** — toggle **"PM notes"** in the top bar to reveal the rationale behind
  each decision, tied back to the research and metrics in the case study.
- **Guided tour** — a one-click, 60-second walkthrough of the full golden path across all lenses.
- **Phone device frame** — the consumer/chef apps render inside a phone mockup on desktop
  (toggle **"Frame"**).

---

## Tech stack

- **Vite + React 18 + TypeScript** — fast, fully static build
- **Tailwind CSS** — mobile-first design system (tokens in [`tailwind.config.js`](tailwind.config.js))
- **Framer Motion** — transitions and interactive widget animation
- **React Router v6** — lens/screen routing (code-split per lens)
- **Zustand** — lightweight state (order/subscription, chef, UI)
- **Recharts** — KPI charts (loaded only for the Strategy console)

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build & preview

```bash
npm run build    # type-checks then builds to dist/
npm run preview  # serve the production build locally
```

## Deploy

Static SPA — deploy `dist/` anywhere. SPA fallback routing is preconfigured:
- **Vercel** — [`vercel.json`](vercel.json) rewrites all routes to `index.html`.
- **Netlify** — [`public/_redirects`](public/_redirects) does the same.

---

## Project structure

```
src/
  components/        Shared UI (ControlBar, PhoneFrame, Annotation, GuidedTour, ui/*)
  data/             Mocked domain + case-study data (chefs, meals, metrics, persona, annotations)
  store/            Zustand stores (order, chef, ui)
  pages/
    PortfolioHome   Landing / lens selector / persona / problem
    consumer/       Discovery, ChefDetail, Customize, Checkout, Tracking
    chef/           Dashboard, BlinkitOrder, Verification
    ops/            OpsConsole + widgets/ (verification sim, unit economics, revenue, funnel, matrix, North Star)
```

All figures are sourced from the Zomato Mom case study (`CASE_STUDY.md`).
