## Replace Birthday Photo

Replace the current `src/assets/birthday-photo.jpg` with the newly uploaded image, keeping original quality (no downscaling/recompression).

### Steps

1. Copy `user-uploads://Snapchat-198507624.jpg` directly over `src/assets/birthday-photo.jpg` using `code--copy` (overwrite=true). This preserves the original file bytes — no quality loss.
2. No code changes needed — `src/pages/Index.tsx` already imports `birthdayPhoto from "@/assets/birthday-photo.jpg"`, so the flip card will automatically pick up the new image.

### Files Modified
- `src/assets/birthday-photo.jpg` (replaced with uploaded photo)
