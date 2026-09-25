# 03 — Turn a description into a DOM element

## The idea

Last section, you described an `h1` with a plain object. This time, a small `render` function will read that description and create the real browser element.

The description is still just data. `render` is the bridge that turns it into something the browser can display. The function already creates an element using the described tag; your small task is to copy the described text into that element.

## Your task

In `src/framework/render.js`, replace the `TODO` by setting the element’s `textContent` from `description.content`.

The page already calls `render` and appends its result. Focus only on setting its text.

## Done when

- The browser shows `My tiny framework` as a heading.
- You can point to which line creates the DOM element and which object value becomes its text.

Tell me when you’re done; we’ll review this step before moving on.
