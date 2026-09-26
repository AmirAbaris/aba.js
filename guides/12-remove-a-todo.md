# 12 — Remove a todo

## The idea

Each row now has a **Remove** button. The `map()` callback also receives the todo’s `index`, which is its position in the `todos` array.

## Your task

In `src/main.js`, replace the TODO so the Remove button deletes this todo from the array and calls `redrawTodos()`.

Hint: `todos.splice(index, 1)` removes one item at that position.

## Done when

- Clicking **Remove** deletes that row.
- Removing one row leaves the other todos intact.

Tell me when you’re done; we’ll review it and confirm the MVP is complete.
