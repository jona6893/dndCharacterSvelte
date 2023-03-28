import { writable } from "svelte/store";
import isEqual from "lodash.isequal";

export function deepEqualStore(initialValue) {
  const store = writable(initialValue);

  return {
    subscribe: store.subscribe,
    set(value) {
      store.update((currentValue) => {
        if (!isEqual(currentValue, value)) {
          return value;
        }
        return currentValue;
      });
    },
  };
}
