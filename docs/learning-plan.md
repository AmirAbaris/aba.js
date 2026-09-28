# Tiny UI Framework: Learning Plan

## Goal

Build a small browser JavaScript framework to learn how framework internals fit together. The framework is the project; a tiny counter will only demonstrate it at the end. You write most of the implementation.

## MVP

- `h(type, props, ...children)` describes UI. `type` can be an HTML tag or a plain function component.
- The renderer creates nested DOM elements, text, properties, and event handlers from those descriptions.
- `createState(initialValue)` provides `get()`, `set(value)`, and `subscribe(listener)`.
- `mount(view, root)` renders a view and provides `update()`.
- Reconciliation updates compatible DOM nodes, replaces nodes when their types change, and adds or removes children by position.
- Function components are stateless. Hooks, JSX, routing, server rendering, and keyed list movement are outside this MVP.

## Phases

1. **UI descriptions:** implement `h()` for text, elements, children, and function component descriptions.
2. **Initial rendering:** create nested DOM nodes from descriptions, including properties and event handlers.
3. **State updates:** implement `createState()` and `mount()`; initially, updates can render the root again.
4. **Reconciliation:** update compatible existing DOM nodes and their children.
5. **Counter example:** connect state and rendering in a tiny app to exercise the framework.

## How we work

Only the current phase gets detailed instructions and TODO comments. Each phase has one capability and about two or three small tasks. You implement the TODOs; then we review the code, check the phase's acceptance cases, and discuss what you learned. We move on only when you say **next**.

Use browser checks for DOM behavior and Node's built-in test runner for pure JavaScript logic. Add no external dependencies.
