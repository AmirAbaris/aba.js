import assert from "node:assert/strict";
import test from "node:test";

import { h } from "./h.js";

test("h describes an element with its type, props, and text child", () => {
  const description = h("p", { className: "intro" }, "Hello");

  assert.equal(description.type, "p");
  assert.deepEqual(description.props, { className: "intro" });
  assert.deepEqual(description.children, ["Hello"]);
});

test("h uses empty props and keeps nested children in order", () => {
  const first = h("li", null, "First");
  const second = h("li", null, "Second");

  const description = h("ul", undefined, first, second);

  assert.deepEqual(description.props, {});
  assert.deepEqual(description.children, [first, second]);
});

test("h stores a function component without calling it", () => {
  let wasCalled = false;
  function Greeting() {
    wasCalled = true;
    return h("p", null, "Hello");
  }

  const description = h(Greeting, { name: "Ada" }, "child");

  assert.equal(description.type, Greeting);
  assert.deepEqual(description.props, { name: "Ada" });
  assert.deepEqual(description.children, ["child"]);
  assert.equal(wasCalled, false);
});
