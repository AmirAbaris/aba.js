export function createDom(description) {
  if (typeof description === "string") {
    return document.createTextNode(description);
  }

  if (typeof description.type === "function") {
    const componentProps = {
      ...description.props,
      children: description.children,
    };
    return createDom(description.type(componentProps));
  }

  const element = document.createElement(description.type);

  if (description.children) {
    for (const child of description.children) {
      const childItem = createDom(child);
      element.append(childItem);
    }
  }


  if (description.props) {
    for (const [key, val] of Object.entries(description.props)) {
      if (key.startsWith("on") && typeof val === "function") {
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, val);
      } else {
        element[key] = val;
      }
    }
  }

  return element;
}
