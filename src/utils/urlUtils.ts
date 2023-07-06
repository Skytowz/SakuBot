export const stringToURL = (rawUrl: string) => {
  return new URL(rawUrl);
};

export const parseUrlPath = (url: URL) => {
  return url.pathname.split('/').filter((pathPart) => pathPart !== '');
};
