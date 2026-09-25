# 02 — Describe UI with a JavaScript value

## The idea

Frameworks often separate *what the UI should be* from the browser DOM nodes that display it. A plain object can describe an element without creating any DOM yet.

For example, an object might say: “this is an `h1`, and its text is `My tiny framework`.” This is only data. The browser will not display it until later code turns the description into DOM.

## Your task

In `src/main.js`, replace the `TODO` with code that:

1. Creates a plain object describing an `h1` with the text `My tiny framework`.
2. Logs that object with `console.log`.

Do not create or append a DOM element in this section. We’re practicing the description first.

## Done when

- The browser console shows an object with the tag and text you intended.
- The page no longer shows the heading. That is expected: this object is data, not a DOM node.
- You can explain the difference between the description object and the DOM element from the previous section.

When you’re done, tell me. We’ll inspect the object together before moving on.
