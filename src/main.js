import { h } from "./framework/h.js";
import { mount } from "./framework/mount.js";
import { createState } from "./framework/state.js";

// 1. Create the data. Its subscribers Set starts empty.
const count = createState(0);

// 2. Describe the UI using the current data each time view() runs.
function view() {
  return h(
    "section",
    {},
    h("h1", {}, "Counter"),
    h("p", {}, "Count: " + String(count.get())),
    h("button", { onClick: increment }, "Add 1"),
  );
}

// 3. A click changes the data.
function increment() {
  count.set(count.get() + 1);
}

// 4. Mount calls view() and creates the initial UI showing 0.
const root = document.getElementById("app");
const app = mount(view, root);

// 5. Store app.update in the Set so future changes redraw the UI.
// Pass the function without () — subscribe doesn't call it yet.
count.subscribe(app.update);
