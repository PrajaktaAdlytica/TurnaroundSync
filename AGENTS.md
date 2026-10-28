# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Approved brand identity
The user selected logo option 1 (Sculpted Airframe) on 2026-10-28. Use the outlined SVG assets in public/brand throughout the website, including header, footer, diagrams and favicons. Primary brass #86652E on white; white reverse on brass/dark. Source: logo-directions/option-1.png. Rebuild assets with scripts/build-brand.py.

## Hero direction
User rejected the three tilted decorative source cards. Retain the aircraft image; use purposeful motion that demonstrates source evidence, timestamp discrepancy and human review. Current hero has a three-chapter synthetic replay with pause/manual controls and reduced-motion fallback.

## Scroll-based hero refinement
Hero camera and evidence are now driven by GSAP ScrollTrigger, not an autoplay loop. Desktop pins the hero for a 1450px scroll story, zooming the plane scene to 1.28x, drawing three source connectors, showing the mismatch and revealing dispatcher review. Mobile uses an unpinned scroll sequence; reduced motion shows the complete scene. Keep source annotations and plane in the same transformed scene so their endpoints stay attached. Preserve Skip sequence and chapter navigation.
