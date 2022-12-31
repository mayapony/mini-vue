export function isObject(target) {
  return typeof target === 'object' && target !== null;
}

export const hasChanged = (oldValue, newValue) => {
  return (
    oldValue !== newValue && !(Number.isNaN(oldValue) && Number.isNaN(newValue))
  );
};
