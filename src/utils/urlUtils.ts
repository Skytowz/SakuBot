import { Message } from 'discord.js';

export const extractUrlFromDiscordMessage = (message: Message) => {
  let rawUrl: string | undefined;

  const sourceImageAttachment = message.attachments.find(
    (value) => value.contentType?.includes('image')
  );

  if (sourceImageAttachment) {
    rawUrl = sourceImageAttachment.url;
  } else {
    rawUrl = message.content;
  }

  if (!rawUrl || !isValidUrl(rawUrl)) {
    return undefined;
  }

  return stringToURL(rawUrl);
};

export const isValidUrl = (rawUrl: string) => {
  let url;
  try {
    url = stringToURL(rawUrl);
  } catch (e) {
    return false;
  }
  return !!url;
};

export const stringToURL = (rawUrl: string) => {
  return new URL(rawUrl);
};

export const parseUrlPath = (url: URL) => {
  return url.pathname.split('/').filter((pathPart) => pathPart !== '');
};
