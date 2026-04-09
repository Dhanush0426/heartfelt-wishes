

## Remove Bottom Quote Line

Remove the "Some people just make the world better… you're one of them ✨" text that appears at the very bottom of the page (the `#bottom` section), while keeping the same line inside the gift reveal message intact.

### Change
- **File:** `src/pages/Index.tsx`
- Remove the `#bottom` `div` block (approximately lines 196-204) that contains the duplicate quote at the bottom of the page.

