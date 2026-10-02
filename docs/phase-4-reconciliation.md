# Phase 4: Reconciliation

## Goal

Update existing DOM nodes instead of rebuilding the whole view. Keep the current counter working, but make its button, section, and text nodes survive updates.

## Your tasks

1. Implement the text and replacement cases in `src/framework/patch.js`. The API is `patch(node, previous, next)`: it receives the existing DOM node and the old and new descriptions, and returns the node that represents the new description. Two strings reuse a text node. Different element types, or text becoming an element (and vice versa), replace the node using `createDom()`.
2. Handle matching elements in `patch()`: update their props and reconcile their children recursively by position. Implement `updateProps()` in the same file. Remove outdated event listeners before adding new ones, append new children, and remove excess children from the end.
3. Connect `patch()` to `mount()` using its TODO comments. Keep the previous description and DOM node in the closure. Create DOM on the first render; patch it on subsequent updates. Save the returned node because the root element can change type.

Start with task 1. You can try `patch()` directly in a temporary browser example before connecting it to `mount()`.

## Function components

Before comparing descriptions, resolve function components by calling them with `{ ...description.props, children: description.children }`. Keep resolving while the result is another function component description. Do this independently for the previous and next descriptions, including during recursive child patches.

For this small implementation, components must be pure and stateless: calling a component again with the same props should describe the same UI. We are not adding component lifecycle or hooks.

## Scope

Descriptions are strings or objects from `h()`. Continue converting numbers to strings. Each description produces one DOM node. Match children by position; keys, list reordering, fragments, and attributes/style systems are outside this phase.

For ordinary props, continue using DOM property assignment as in `createDom()`. The removal checks use `id`, `className`, `value`, and `disabled`: reset removed string props to `""` and removed `disabled` to `false`.

## Browser checks

- Patch text from `"Count: 0"` to `"Count: 1"`. Its content changes, but the text node is the same object.
- Change a description from `h("p", {}, "Hello")` to `h("div", {}, "Hello")`. The old node is replaced. Also check text becoming an element and an element becoming text.
- With the counter connected to `mount()`, keep a reference to its button before clicking. After several clicks, the count changes and the button is still the same object.
- Change and remove `id`, `className`, and `disabled` props. Check the actual DOM properties.
- Replace an `onClick` handler, then remove it. Only the current handler should run; the removed handler should stop running.
- Add and remove children at the end. Shared positions reuse compatible nodes, and the final content and child count are correct.
- Update a function component's props and confirm its output changes. Check a component that changes its returned element type too.
- Keep an input with an unchanged `value` prop in the view. Focus it and type, then trigger a separate state update. The input node, focus, and typed text should survive. Avoid assigning unchanged props.

Run `npm test` to check that the existing description and state behavior still works. Those tests do not verify DOM reconciliation; use the browser checks above for that.

The implementation is now complete. For repeatable DOM regression checks, serve the project with `python3 -m http.server 5173 --bind 127.0.0.1` and open `http://127.0.0.1:5173/tests/browser.html`. This runs nine checks against real browser DOM nodes without adding dependencies.

## Done when

- The browser checks pass and the existing tests still pass.
- You can explain when `patch()` reuses a node and when it replaces one.
- You can explain why child removal happens from the end and why old event handlers must be removed.

Ask for a review before moving to the next phase.
