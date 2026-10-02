import { createDom } from "./dom.js";
import { patch } from "./patch.js";

export function mount(view, root) {
  let previousDescription;
  let node;

  function update() {
    const description = view();
    if (node === undefined) {
      node = createDom(description);
      root.replaceChildren(node);
    } else {
      node = patch(node, previousDescription, description);
    }
    previousDescription = description;
  }

  update();

  return { update };
}
