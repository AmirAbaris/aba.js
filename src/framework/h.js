export function h(type, props, ...children) {
  if (!type) throw Error("type is required");

  return {
    type,
    props: props ?? {},
    children,
  };
}
