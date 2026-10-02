import { h } from "../src/framework/h.js";
import { createDom } from "../src/framework/dom.js";
import { patch } from "../src/framework/patch.js";
import { mount } from "../src/framework/mount.js";
import { createState } from "../src/framework/state.js";

const fixture = document.getElementById("fixture");
const results = document.getElementById("results");
let failures = 0;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function attach(description) {
  const node = createDom(description);
  fixture.replaceChildren(node);
  return node;
}

function check(name, run) {
  const result = document.createElement("li");
  try {
    run();
    result.textContent = `PASS: ${name}`;
  } catch (error) {
    failures++;
    result.textContent = `FAIL: ${name}: ${error.message}`;
    console.error(error);
  }
  results.append(result);
  fixture.replaceChildren();
}

check("Text updates retain the text node", () => {
  const node = attach("Count: 0");
  assert(patch(node, "Count: 0", "Count: 1") === node, "Text node was replaced");
  assert(node.nodeValue === "Count: 1", "Text did not update");
});

check("Different tags and text/element transitions replace nodes", () => {
  let previous = h("p", {}, "Hello");
  let node = attach(previous);
  for (const next of [h("div", {}, "Hello"), "Text", h("span", {}, "Back")]) {
    const oldNode = node;
    node = patch(node, previous, next);
    assert(node !== oldNode && !oldNode.isConnected, "Old node was retained");
    assert(fixture.firstChild === node, "Replacement was not attached");
    previous = next;
  }
  assert(node.tagName === "SPAN" && node.textContent === "Back", "Wrong output");
});

check("Counter updates preserve section, button, and text identity", () => {
  const count = createState(0);
  const increment = () => count.set(count.get() + 1);
  const app = mount(() => h("section", {},
    h("p", {}, String(count.get())),
    h("button", { onClick: increment }, "Add 1")), fixture);
  const unsubscribe = count.subscribe(app.update);
  const section = fixture.firstChild;
  const text = section.firstChild.firstChild;
  const button = section.lastChild;
  for (let index = 0; index < 3; index++) button.click();
  assert(count.get() === 3 && text.nodeValue === "3", "Counter did not update");
  assert(fixture.firstChild === section && section.lastChild === button &&
    section.firstChild.firstChild === text, "Counter nodes were replaced");
  unsubscribe();
});

check("Props change and reset when removed", () => {
  const previous = h("input", { id: "old", className: "old", value: "old", disabled: true });
  const next = h("input", { id: "new", className: "new", value: "new", disabled: false });
  const node = attach(previous);
  patch(node, previous, next);
  assert(node.id === "new" && node.className === "new" && node.value === "new" &&
    node.disabled === false, "Props did not change");
  patch(node, next, h("input", {}));
  assert(node.id === "" && node.className === "" && node.value === "" &&
    node.disabled === false, "Removed props did not reset");
});

check("Event handlers are replaced, retained once, and removed", () => {
  let oldCalls = 0;
  let newCalls = 0;
  const previous = h("button", { onClick: () => oldCalls++ }, "Click");
  const next = h("button", { onClick: () => newCalls++ }, "Click");
  const node = attach(previous);
  node.click();
  patch(node, previous, next);
  patch(node, next, next);
  node.click();
  patch(node, next, h("button", {}, "Click"));
  node.click();
  assert(oldCalls === 1 && newCalls === 1, "Outdated or duplicate handler ran");
});

check("Children update by position, append, and shrink to zero", () => {
  const previous = h("section", {}, h("p", {}, "A"), h("p", {}, "B"));
  const node = attach(previous);
  const firstChild = node.firstChild;
  const expanded = h("section", {}, h("p", {}, "Updated"), "Text", h("b", {}, "C"));
  patch(node, previous, expanded);
  assert(node.firstChild === firstChild && node.textContent === "UpdatedTextC" &&
    node.childNodes.length === 3, "Expansion or child replacement failed");
  const shortened = h("section", {}, h("p", {}, "Only"));
  patch(node, expanded, shortened);
  assert(node.firstChild === firstChild && node.childNodes.length === 1 &&
    node.textContent === "Only", "Trailing children were not removed");
  patch(node, shortened, h("section", {}));
  assert(node.childNodes.length === 0, "Last child was not removed");
});

check("Nested function components update props and replace their output", () => {
  const Label = ({ tag, text, children }) => h(tag, {}, text, ...children);
  const Wrapper = (props) => h(Label, props, ...props.children);
  const previous = h(Wrapper, { tag: "p", text: "Old" }, "!");
  const node = attach(previous);
  const next = h(Wrapper, { tag: "p", text: "New" }, "!");
  assert(patch(node, previous, next) === node && node.textContent === "New!", "Component update failed");
  const replacement = patch(node, next, h(Wrapper, { tag: "div", text: "Changed" }));
  assert(replacement.tagName === "DIV" && replacement.textContent === "Changed", "Component type change failed");
});

check("Mount remembers a replaced root for subsequent updates", () => {
  let description = h("p", {}, "First");
  const app = mount(() => description, fixture);
  description = h("div", {}, "Second");
  app.update();
  const replacement = fixture.firstChild;
  description = h("div", {}, "Third");
  app.update();
  assert(fixture.firstChild === replacement && replacement.textContent === "Third", "Mount retained a stale root");
});

check("Unchanged input value preserves typed text, focus, and selection", () => {
  let count = 0;
  const app = mount(() => h("section", {},
    h("input", { value: "initial" }), String(count)), fixture);
  const input = fixture.firstChild.firstChild;
  input.focus();
  input.value = "typed by the user";
  input.setSelectionRange(3, 5);
  count++;
  app.update();
  assert(fixture.firstChild.firstChild === input && document.activeElement === input,
    "Input identity or focus changed");
  assert(input.value === "typed by the user" && input.selectionStart === 3 &&
    input.selectionEnd === 5, "Input text or selection was reset");
});

const summary = document.createElement("p");
summary.textContent = failures === 0 ? "All 9 browser checks passed." : `${failures} checks failed.`;
document.body.append(summary);
