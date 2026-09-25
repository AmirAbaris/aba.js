# 11 — Mark a todo complete

## The idea

Each todo is now an object with its text and a `completed` boolean. The row and its button already show the current status: incomplete todos have a **Done** button; completed todos show a check and an **Undo** button.

## Your task

In `src/main.js`, replace the TODO in each todo’s button handler so it toggles that todo’s `completed` value and calls `redrawTodos()`.

## Done when

- Clicking **Done** marks that row with a check and changes the button to **Undo**.
- Clicking **Undo** returns it to incomplete.
- Other todo rows keep their own status.

Tell me when you’re done; we’ll review it before adding the final MVP action.
