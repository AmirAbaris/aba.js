# 07 — Render nested elements

## The idea

Real interfaces contain elements inside other elements. The example in `main.js` describes a section with a paragraph and a button inside it.

`render` can use itself to render each child. This is called recursion: a function solves a smaller version of the same job by calling itself.

## Your task

In `src/framework/render.js`, replace the TODO so each child description is rendered and appended to the current element.

## Done when

- Below the counter, the browser shows a section containing a paragraph and a button.
- You can point to how `render` handles a child description.

Tell me when you’re done; we’ll review this step before moving on.
