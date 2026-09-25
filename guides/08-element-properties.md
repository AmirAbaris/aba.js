# 08 — Add properties to elements

## The idea

An element description can include properties for the real DOM element. The example now includes an input with a type and placeholder. The renderer needs to copy those values onto the input.

The `props` object stores property names and values. `Object.entries()` lets the renderer handle each pair in the same way.

## Your task

In `src/framework/render.js`, replace the TODO by assigning each `value` to the element property named `name`.

## Done when

- The nested example includes a text input showing `A todo could go here` as its placeholder.
- The counter and other nested elements still work.

Tell me when you’re done; we’ll review this step before moving on.
