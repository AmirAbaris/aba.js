# Phase 2: Initial rendering

## Goal

Turn a UI description from `h()` into real browser DOM nodes. For now, create the DOM from scratch; keeping and updating old nodes comes in Phase 4.

The new code belongs in `src/framework/dom.js`. The older `src/framework/render.js` stays as a reference for this phase.

## Your tasks

1. Implement `createDom(description)`. For an HTML tag description, create an element with `document.createElement()`.
2. Add its children in order. Turn string children into text nodes; turn description children into DOM by calling `createDom()` again. If the type is a function, call it with its props and children, then create DOM from what it returns.
3. Apply props to the element. Set ordinary props such as `id` and `className` as DOM properties. For props whose names start with `on` (such as `onClick`), add an event listener using the remaining name as the event type.

## Browser check

Temporarily use `src/main.js` to create and append a description under `#app`. Check that:

- nested elements and text appear in the right order;
- a prop such as `id` or `className` is applied;
- clicking a button with an `onClick` prop runs its handler;
- a function component renders the description it returns, and receives its children in `props.children`.

One possible description to try:

```js
function Greeting(props) {
  return h("p", { className: "greeting" }, "Hello, ", props.name, "! ", ...props.children);
}

h("section", { id: "example" },
  h("h1", null, "First render"),
  h(Greeting, { name: "Ada" }, h("strong", null, "welcome")),
  h("button", { onClick: () => console.log("clicked") }, "Click me"),
)
```

Remember to import `h` in `main.js` when trying this example. This is a temporary browser check, not the counter example phase.

## Done when

- The browser checks above work.
- You can explain how recursion lets a parent description create all its nested DOM.
- `src/framework/h.js` remains a description builder and does not call browser DOM functions.
