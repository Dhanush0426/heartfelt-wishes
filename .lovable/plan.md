## Goal

Eliminate mobile stutter on page load and when the gift modal opens, without removing any existing animations.

## Changes

### 1. `src/pages/Index.tsx` — Preload card + smoother modal

- Add a `useEffect` that runs once on mount: `const img = new Image(); img.src = greetingCard;` so the browser downloads/decodes the card while the user reads the page (no stutter on reveal).
- Track image-loaded state with `useState<boolean>(false)` set inside the preloader's `img.onload`. Use it to start the modal image at `opacity-0` and fade to `opacity-100` once loaded (`transition-opacity duration-300`).
- Remove `loading="lazy"` from the modal `<img>`. Keep `decoding="async"` and `sizes`. Add `fetchPriority="high"` for good measure.
- Wrap the reveal container with explicit GPU hints: `style={{ willChange: "transform, opacity", transform: "translate3d(0,0,0)" }}` on the outer `animate-reveal` div (currently only the inner `<img>` has it).

### 2. `src/hooks/useClickConfetti.ts` — Skip entirely on mobile

- At the top of the effect, detect `window.innerWidth < 768`. If mobile, return early — no canvas creation, no listeners, no RAF loop. This frees CPU/GPU on the device that needs it most.
- Desktop behavior unchanged (24 particles, shadows, throttling, MAX_PARTICLES cap).

### 3. `src/index.css` — Confirm reveal keyframes are GPU-only

- Verify `@keyframes reveal` and `@keyframes paper-float` use only `transform` (translate3d/scale) and `opacity`. They already do per the prior optimization pass, so no edit unless an offending property is found on re-read.

## Trade-offs

- Mobile users lose the click-burst confetti effect entirely. The page-level floating emojis, bunting sway, photo flip sparkles, and gift-button confetti emojis all remain — so the page still feels alive. This is the single biggest CPU win on low-end phones.
- Preloading adds one image fetch on mount (~the card asset). It's already going to load when the user clicks, so net cost is zero; it just shifts timing to when the device is idle.

## Out of scope

No animation count reductions, no removal of floating emojis or bunting, no change to typography or layout.
