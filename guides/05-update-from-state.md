# 05 — Update the UI from state

## The idea

The number in a UI can come from ordinary JavaScript data. Here, `count` is that data. `createCounter()` reads it to describe the button, and `redraw()` creates a fresh button from the latest description.

For this first version, `redraw()` replaces the whole old button. Later we’ll learn to update only what changed.

## Your task

In `src/main.js`, replace the `TODO` so clicking the button:

1. Increases `count` by one.
2. Calls `redraw()` so the button displays the new value.

## Done when

- The button starts at `Count: 0`.
- Each click increases the displayed count by one.
- You can explain why changing `count` alone would not update the page.

Tell me when you’re done; we’ll review this step before moving on.
