export const stringToURL = (rawUrl: string) => {
  let url;
  try {
    url = new URL(rawUrl);
  } catch (e) {
    /* empty */
  }
  return url;
};

export const parseUrlPath = (url: URL) => {
  return url.pathname.split('/').filter((pathPart) => pathPart !== '');
};
