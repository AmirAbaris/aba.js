import { createDom } from "./dom.js";

export function mount(view, root) {
  function update() {
    const description = view();
    const element = createDom(description);
    root.replaceChildren(element);
  }

  update();

  return { update };
}
