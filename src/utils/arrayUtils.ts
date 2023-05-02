export const sample = (array: Array<any>) => {
  if (array.length == 1) return array[0];
  return array[Math.floor(Math.random() * array.length)];
};
