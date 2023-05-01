export const filterCommandsFromList = (commands: Array<string>) => {
  return commands.filter((f) => f.match(/^(?:(?!(?:\.data)).)*\.js$/));
};

export const filterCommandsDataFromList = (commands: Array<string>) => {
  return commands.filter((f) => f.match(/\.data\.js$/));
};
