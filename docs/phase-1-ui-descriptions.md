# Phase 1: UI descriptions

## Goal

Create `h(type, props, ...children)`, a small helper that stores what the UI should look like. It describes the UI; it does not create browser DOM nodes.

For example, the call

```js
h("p", { className: "intro" }, "Hello")
```

should describe a `p` element with a `className` property and one text child. The result is an ordinary JavaScript object that the renderer can read later.

## Your tasks

1. In `src/framework/h.js`, return a description containing `type`, `props`, and `children`. When `props` is missing, use an empty object.
2. Keep children in the order they were passed. A child can be text or another description made with `h()`.
3. Keep a function component as the description's `type`; do not call it inside `h()`. The renderer will call it in a later phase and pass it the component's props and children.

## Check your work

Run `npm test`. The tests describe the expected shape of descriptions for a DOM element, nested children, and a function component. They should pass before moving on.

## Done when

- All Phase 1 tests pass.
- You can explain why `h()` returns an object instead of calling `document.createElement()`.
- You can point to where a component function is stored and where its children are stored.
