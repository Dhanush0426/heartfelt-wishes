

## Multiple Enhancements to Birthday Page

### Changes Overview

**1. Photo flip animation** -- Add sparkle/glow burst when cake flips to photo
- Add `photoFlipped` tracking state; when flipping to photo side, trigger a brief sparkle ring animation around the circle
- Add a new `animate-flip-sparkle` keyframe in `index.css` (radial scale + fade)
- Render conditional sparkle emojis around the photo circle on flip

**2. Floating emojis -- make them cover full screen & increase count**
- Change `z-0` to `z-30` so they float over the message boxes
- Increase count from 30 to 45
- They already float from bottom to top (`bottom: -20px`, `animate-float-up` goes to `-10vh`), so they do cover the full page -- but increase the z-index so they visually appear above the glass cards

**3. Text changes (4 edits in Index.tsx):**
- Line 241: `The way you are… it's really rare these days.` → `The way you are… it's really rare these days 💎`
- Line 244: `Your simplicity is something really special 😊` → `Your simplicity is something really special 🙏`
- Line 205: `Happiest bday my dear` → `Happiest birthday my dear`
- Line 248: `you are my best friend 😊` → `you are my best friend 💖`

### Files Modified

**`src/pages/Index.tsx`**
- Increase `floatingItems` length from 30 to 45
- Change floating emoji `z-0` → `z-30` (line 99)
- Add `photoFlipSparkle` state; on flip to photo, show sparkle burst emojis around the circle for ~1s
- 4 text emoji/wording changes listed above

**`src/index.css`**
- Add `@keyframes flip-sparkle` for radial sparkle effect on photo reveal
- Add `.animate-flip-sparkle` class

