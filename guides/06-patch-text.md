# 06 — Update one DOM node in place

## The idea

The counter works by creating a new button after every click and replacing the old one. But the button itself did not change—only its text did.

This step adds a tiny patch: keep the existing button and change just its text. The click handler stays attached to that same button.

## Your task

In `src/framework/render.js`, replace the `TODO` in `patchText(element, text)` so it updates the existing element’s `textContent` to `text`.

## Done when

- The counter still starts at `Count: 0` and increments on each click.
- You can explain what `redraw()` does differently when the button already exists.

Tell me when you’re done; we’ll review this step before moving on.
