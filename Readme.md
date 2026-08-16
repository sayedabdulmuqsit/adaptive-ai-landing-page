# AI Basics for Beginners — Adaptive Landing Page

A landing page for a beginner AI course that adapts its own content in real time based on visitor behavior — no backend, no external API, pure client-side logic.

**Live Demo:** [add your deployed link here]

---

## How it works

The page runs a lightweight behavioral agent that watches how a visitor interacts with it:

- **Signals tracked:** time spent on page, scroll count, whether the CTA was clicked
- **Classification:** every 30s, the visitor is bucketed into one of three states — *Engaged*, *Mild Confusion*, or *High Confusion* — based on those signals
- **Adaptive response:**
  - **Engaged** → confirmation message, dashboard updates
  - **Mild confusion** → feature cards get highlighted to draw attention to key benefits
  - **High confusion** → headline, CTA text, and a reassurance message are swapped for simpler alternatives, page is visually simplified
- **Live analytics dashboard** on-page shows total visitors and the engaged/mild/high breakdown, persisted via `localStorage`

This is a rule-based adaptive agent (no LLM/API call) — the "intelligence" is a set of behavior thresholds and pre-written content variants, not generative AI. Framed as a UX pattern for conversion optimization.

## Tech Stack

Vanilla HTML, CSS, JavaScript — no frameworks, no build step.

- Animated gradient background + floating particles (pure CSS/JS)
- Scroll-reveal animations via scroll listener
- State persisted client-side with `localStorage`

## Getting Started

```bash
git clone https://github.com/sayedabdulmuqsit/agentic-ai-edtech-website.git
cd agentic-ai-edtech-website
```

Just open `index.html` in a browser — no install, no server needed.

## Project Doc

See [`Project-doc.pdf`](./Project-doc.pdf) for the original design/spec write-up.

## Roadmap

- [ ] Replace rule-based classification with a real ML/LLM-based engagement model
- [ ] A/B test the content variants
- [ ] Mobile performance pass (particle count / animations)

## Author

**Abdul Muqsit Sayed**
[GitHub](https://github.com/sayedabdulmuqsit) · [Portfolio](http://muqsit-portfolio-site.s3-website.eu-north-1.amazonaws.com)
