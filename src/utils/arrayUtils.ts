export const sample = <T>(array: Array<T>) => {
  if (array.length == 1) return array[0];
  return array[Math.floor(Math.random() * array.length)];
};
