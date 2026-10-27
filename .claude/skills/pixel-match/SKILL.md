---
name: pixel-match
description: Loop for matching one section of the clone to reference screenshots, measuring instead of eyeballing.
---

# Pixel-match loop

Work one section at a time (header, hero, overview, amenities, calendar, reviews, map, host, things to know, nearby, photo tour, lightbox).

1. Pick the reference screenshot for the section and note measurable values: width, height, gaps, font size and weight, colours, radius.
2. Put those values in `src/styles/tokens.css` or the section's CSS rule, not inline.
3. Capture the same state of the clone at 1440x900 and compare side by side.
4. Fix the largest difference first, re-capture, repeat until nothing visible differs.
5. Then check hover, focus-visible, keyboard and reduced-motion behaviour for that section.
6. Run the `ui-fidelity-reviewer` and `a11y-auditor` agents before moving on.

Never copy markup or CSS from the reference page; reproduce it from what you can see.
