export const sample = (array: Array<unknown>) => {
  if (array.length == 1) return array[0];
  return array[Math.floor(Math.random() * array.length)];
};
