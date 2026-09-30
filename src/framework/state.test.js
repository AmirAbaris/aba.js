import assert from "node:assert/strict";
import test from "node:test";

import { createState } from "./state.js";

test("state starts with its initial value and can be read", () => {
  const state = createState(3);

  assert.equal(state.get(), 3);
});

test("set updates the value and notifies subscribers with the new value", () => {
  const state = createState(0);
  const values = [];
  state.subscribe((value) => values.push(value));

  state.set(1);
  state.set(1);

  assert.equal(state.get(), 1);
  assert.deepEqual(values, [1]);
});

test("unsubscribe stops future notifications", () => {
  const state = createState("before");
  const values = [];
  const unsubscribe = state.subscribe((value) => values.push(value));

  unsubscribe();
  state.set("after");

  assert.deepEqual(values, []);
});
