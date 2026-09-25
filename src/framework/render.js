export function render(description) {
  // The tag comes from the description, so this creates a real browser element.
  const element = document.createElement(description.type);

  element.textContent = description.content ?? "";

  if (description.children) {
    for (const child of description.children) {
      const childElement = render(child);
      element.append(childElement);
    }
  }

  if (description.props) {
    for (const [name, value] of Object.entries(description.props)) {
      element[name] = value;
    }
  }

  element.addEventListener("click", description.onClick);

  return element;
}

export function patchText(element, text) {
  element.textContent = text;
}
