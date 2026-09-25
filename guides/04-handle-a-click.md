# 04 — Connect a click handler

## The idea

An element description can include a function for what should happen when it is clicked. The renderer’s job is to connect that function to the real DOM element.

The description already has an `onClick` function. It changes the heading to `Clicked!` when called.

## Your task

In `src/framework/render.js`, replace the `TODO` with one `addEventListener` call that connects `description.onClick` to the element’s `click` event.

## Done when

- The page shows `My tiny framework` at first.
- Clicking the heading changes it to `Clicked!`.
- You can explain that `addEventListener` connects a browser event to the function in the description.

Tell me when you’re done; we’ll review this step before moving on.
