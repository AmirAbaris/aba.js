# 10 — Add a todo

## The idea

The todo view is already described and rendered from the `todos` array. The Add button is the missing connection: it needs to read the input, change the array, then redraw the view.

## Your task

In `src/main.js`, replace the TODO so the button:

1. Finds the input with `id="new-todo"`.
2. Adds the input’s value to `todos`.
3. Calls `redrawTodos()`.

## Done when

- Typing a todo and clicking **Add todo** shows it in the list.
- Adding another todo shows both items.
- You can explain why the click handler calls `redrawTodos()` after changing the array.

Tell me when you’re done; we’ll review this MVP step before moving on.
