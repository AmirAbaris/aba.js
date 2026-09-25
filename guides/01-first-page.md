# 01 — Make the page show something

## The idea

The browser already knows how to create and display interface elements. Before building a framework, we’ll use that built-in ability directly. Later, the framework will take over some of this work.

`index.html` provides an empty `<main>` element. `src/main.js` finds it. Your job is to create one heading in JavaScript and place it inside that main element.

## Your task

From the project folder, start a local server with `python3 -m http.server 8000`, then open `http://localhost:8000` in your browser. (Stop the server later with `Ctrl+C` in its terminal.)

In `src/main.js`, replace the `TODO` with code that:

1. Creates an `h1` element.
2. Sets its text to `My tiny framework`.
3. Appends it to `app`.

Use the browser’s DOM methods; don’t add a library.

## Done when

- Opening `index.html` in a browser shows the heading.
- You can explain what each of your three DOM operations does.

When you’re done, tell me. We’ll review it together and then decide whether this section is complete before moving on.
