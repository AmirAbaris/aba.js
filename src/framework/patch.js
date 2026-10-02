import { createDom } from "./dom.js";

export function patch(node, previous, next) {
  previous = resolveComponent(previous);
  next = resolveComponent(next);

  const previousIsText = typeof previous === "string";
  const nextIsText = typeof next === "string";

  if (previousIsText && nextIsText) {
    if (previous !== next) node.nodeValue = next;
    return node;
  }

  if (previousIsText !== nextIsText || previous.type !== next.type) {
    const replacement = createDom(next);
    node.replaceWith(replacement);
    return replacement;
  }

  updateProps(node, previous.props, next.props);

  const previousChildren = previous.children ?? [];
  const nextChildren = next.children ?? [];
  const sharedCount = Math.min(previousChildren.length, nextChildren.length);

  for (let index = 0; index < sharedCount; index++) {
    patch(node.childNodes[index], previousChildren[index], nextChildren[index]);
  }

  for (let index = sharedCount; index < nextChildren.length; index++) {
    node.append(createDom(nextChildren[index]));
  }

  // Remove from the end so the remaining child indexes stay stable.
  while (node.childNodes.length > nextChildren.length) {
    node.lastChild.remove();
  }

  return node;
}

function updateProps(element, previous = {}, next = {}) {
  const names = new Set([...Object.keys(previous), ...Object.keys(next)]);

  for (const name of names) {
    const hadProp = Object.hasOwn(previous, name);
    const hasProp = Object.hasOwn(next, name);
    const oldValue = previous[name];
    const newValue = next[name];

    // Skipping unchanged values also preserves user edits in input elements.
    if (hadProp === hasProp && Object.is(oldValue, newValue)) continue;

    if (name.startsWith("on")) {
      const eventName = name.slice(2).toLowerCase();
      if (typeof oldValue === "function") {
        element.removeEventListener(eventName, oldValue);
      }
      if (typeof newValue === "function") {
        element.addEventListener(eventName, newValue);
      } else if (hasProp) {
        element[name] = newValue;
      }
    } else if (hasProp) {
      element[name] = newValue;
    } else {
      // Match our DOM-property API: reset strings and booleans when removed.
      const currentValue = element[name];
      element[name] = typeof currentValue === "boolean"
        ? false
        : typeof currentValue === "string" ? "" : null;
    }
  }
}

function resolveComponent(description) {
  while (typeof description !== "string" && typeof description.type === "function") {
    description = description.type({
      ...description.props,
      children: description.children,
    });
  }
  return description;
}
