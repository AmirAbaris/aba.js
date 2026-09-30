export const createState = (initialValue) => {
  let globalValue = initialValue;
  const subscribers = new Set();

  return {
    get() {
      return globalValue;
    },
    set(value) {
      if (Object.is(globalValue, value)) return;

      globalValue = value;
      subscribers.forEach((listener) => listener(value));
    },
    subscribe(listener) {
      subscribers.add(listener);
      return () => subscribers.delete(listener);
    },
  };
};
