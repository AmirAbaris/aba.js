# Phase 3: State updates

## Goal

Keep a value in framework state, notify the app when it changes, and redraw the view. For this phase, redraw the whole root each time. Phase 4 will teach the framework to keep and update existing DOM nodes.

## Your tasks

1. In `src/framework/state.js`, implement `createState(initialValue)` with `get()` and `set(value)`. When the value changes, notify each subscriber with the new value. Use `Object.is()` to decide whether a value changed.
2. Add `subscribe(listener)`. Return an unsubscribe function so a subscriber can stop receiving updates.
3. In `src/framework/mount.js`, implement `mount(view, root)`. Here, `view` is a function that returns a UI description. Render it once when mounting; return an object with `update()`, which calls `view()` again and replaces the root's contents with the new DOM.

## Browser check

Use `src/main.js` to try a tiny counter. The view function should read `count.get()` and return a description with the current number. Convert the number to text with `String(count.get())`. Mount the view, then connect state changes to rendering with `count.subscribe(app.update)`. A button should call `count.set(count.get() + 1)`.

Check that the number appears at first, and that clicking the button changes it. The page may redraw its elements on every click in this phase; retaining DOM nodes comes in Phase 4.

## Check your work

Run `npm test` for the state tests, then do the browser check above.

## Done when

- The state tests pass, including notification and unsubscribe behavior.
- The browser counter updates when clicked.
- You can explain the flow: `set()` notifies the subscriber, the subscriber calls `app.update()`, and `update()` asks `view()` for a fresh description.
